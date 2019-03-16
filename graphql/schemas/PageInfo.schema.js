const gql = require('graphql-tag')

exports.typeDefs = gql`
  type Metadata {
    title: String
    description: String
    pageType: String
  }

  type PageHeadings {
    primary: String
    secondary: String
  }

  type HtmlSlot {
    id: ID!
    name: String
    html: String
    text: String
  }

  type PageInfo {
    id: ID!
    path: String!
    meta: Metadata!
    headings: PageHeadings
    slots: [HtmlSlot]
  }

  extend type Query {
    getPage(path: String!): PageInfo
  }
`

exports.resolvers = {
  Query: {}
}
