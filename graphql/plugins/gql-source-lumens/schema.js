const gql = require('graphql-tag')

exports.typeDefs = gql`
  extend type Product {
    url: String
    basePrice: String
  }
`

exports.resolvers = {
  Query: {
    getPage: async (root, { path }, { dataSources }) => {
      return await dataSources.LumensAPI.getPage(path)
    },

    getProducts: async (root, { path }, { dataSources }) => {
      const products = await dataSources.LumensAPI.getProducts(path)
      return { edges: products.map(node => ({ node })) }
    },

    getProduct: async (root, { path }, { dataSources }, info) => {
      return await dataSources.LumensAPI.getProduct(path)
    },

    getNavMenu: async (root, args, { dataSources }) => {
      return await dataSources.LumensAPI.getNavMenu()
    },

    getCart: async (root, args, { dataSources }) => {
      return await dataSources.LumensAPI.getCart()
    }
  }
}
