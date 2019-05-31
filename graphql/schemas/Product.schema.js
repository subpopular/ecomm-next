const gql = require('graphql-tag')
const Image = require('./Image.schema').typeDefs

exports.typeDefs = gql`
  type ProductListNode {
    node: Product
  }

  type ProductList {
    edges: [ProductListNode]
  }

  type Product {
    id: ID!
    name: String!
    path: String
    description: String
    category: Category
    price: Float
    sku: String
    brand: String
    rating: Float
    reviewCount: Int
    thumbnail: Image
    images: [Image]
  }

  extend type Query {
    getProducts(ids: String!): ProductList
    getProduct(id: String!): Product
  }

  ${Image}
`

exports.resolvers = {
  Query: {}
}
