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

    categories: async root => {
      return root.categories
        ? {
            edges: root.categories.map(cat => ({
              node: cat
            }))
          }
        : null
    }
  },

  CategoryProductList: {
    category: async (root, args, { dataSources }) => {
      return await dataSources.OCAPI.getCategory(root.selected_refinements.cgid)
    },

    products: async (root, args, { dataSources }) => {
      if (root.hits) {
        const { data: products } = await dataSources.OCAPI.getProducts(
          root.hits.map(p => p.product_id)
        )
        return {
          edges: products.map(item => ({
            node: {
              id: item.product_id,
              name: item.product_name,
              ...item
            }
          }))
        }
      }
      return null
    }
  },

  Product: {
    sku: root => {
      console.log(root)
      return 'foo'
    },
    images: async (root, args, { dataSources }) => {
      let imageGroups = root.image_groups
      if (!imageGroups) {
        const res = await dataSources.OCAPI.getProduct(root.id)
        imageGroups = res.image_groups
      }

      return imageGroups
        .find(i => i.view_type === 'large')
        .images.map(img => ({
          src: img.dis_base_link,
          alt: img.alt
        }))
    }
  }
}
