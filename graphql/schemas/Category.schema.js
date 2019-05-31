const gql = require('graphql-tag')

exports.typeDefs = gql`
  type CategoryListNode {
    node: Category
  }

  type CategoryList {
    edges: [CategoryListNode]
  }

  type Category {
    id: ID!
    name: String!
    url: String!
    parentCategory: Category
    categories: CategoryList
  }

  extend type Query {
    getCategory(id: String!): Category
  }
`

exports.resolvers = {
  Query: {}
}
