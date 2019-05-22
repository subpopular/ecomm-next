const gql = require('graphql-tag')

exports.typeDefs = gql`
  type CategoryProductList {
    count: Int!
    start: Int!
    total: Int!
    category: Category
    products: ProductList
  }

  extend type Category {
    parentCategoryId: String
  }

  extend type Query {
    getCategoryProductList(categoryId: String!): CategoryProductList
  }
`

exports.resolvers = {
  Query: {
    getProduct: async (root, { id }, { dataSources }, info) => {
      return await dataSources.OCAPI.getProduct(id)
    },

    getCategory: async (root, { id }, { dataSources }, info) => {
      return await dataSources.OCAPI.getCategory(id)
    },

    getCategoryProductList: async (root, { categoryId }, { dataSources }, info) => {
      return await dataSources.OCAPI.getCategoryProductList(categoryId)
    }
  },

  Category: {
    url: root => root.c_alternativeUrl,

    categories: async (root, { id }, { dataSources }, info) => {
      return root.categories
        ? {
            edges: await Promise.all(
              root.categories.edges.map(({ node }) => ({
                node: dataSources.OCAPI.getCategory(node.id)
              }))
            )
          }
        : null
    }
  },

  CategoryProductList: {
    category: async (root, args, { dataSources }) => {
      return await dataSources.OCAPI.getCategory(root.selected_refinements.cgid)
    },

    products: root => {
      return root.hits
        ? {
            edges: root.hits.map(item => ({
              node: {
                id: item.product_id,
                name: item.product_name,
                ...item
              }
            }))
          }
        : null
    }
  },

  Product: {
    images: async (root, args, { dataSources }) => {
      if (!root.image_groups) {
        const res = await dataSources.OCAPI.getProduct(root.id)
        return res.image_groups
          .find(i => i.view_type === 'large')
          .images.map(img => ({
            src: img.dis_base_link,
            alt: img.alt
          }))
      }
    }
  }
}
