const gql = require('graphql-tag')

exports.typeDefs = gql`
  scalar JSON

  type NavMenu {
    id: ID!
    levels: JSON
  }

  extend type Query {
    getNavMenu: NavMenu
  }
`

exports.resolvers = {
  Query: {}
}
