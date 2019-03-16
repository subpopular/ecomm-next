const gql = require('graphql-tag')

exports.typeDefs = gql`
  type CartItem {
    id: ID!
    name: String!
    path: String
    uuid: String
    quantity: Int
    description: String
    category: String
    price: Float
    sku: String
    brand: String
    thumbnail: Image
  }

  type Cart {
    items: [CartItem]!
  }

  extend type Query {
    getCart: Cart!
  }
`

exports.resolvers = {
  Query: {
    getCart: () => ({
      items: []
    })
  },
  Mutation: {}
}
