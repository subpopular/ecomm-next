const gql = require('graphql-tag')
const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')
const PageInfo = require('./PageInfo.schema')
const Product = require('./Product.schema')
const Category = require('./Category.schema')
const Cart = require('./Cart.schema')
const NavMenu = require('./NavMenu.schema')

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

const baseTypeDefs = [
  Query,
  PageInfo.typeDefs,
  Product.typeDefs,
  Category.typeDefs,
  Cart.typeDefs,
  NavMenu.typeDefs
]
const baseResolvers = {}

exports.baseTypeDefs = baseTypeDefs
exports.baseResolvers = baseResolvers

exports.createSchema = (extensions = {}) => {
  const resolvers = merge(
    baseResolvers,
    PageInfo.resolvers,
    Product.resolvers,
    Category.resolvers,
    Cart.resolvers,
    extensions.resolvers
  )

  let typeDefs = baseTypeDefs

  if (extensions.typeDefs) {
    typeDefs = typeDefs.concat(extensions.typeDefs)
  }

  return makeExecutableSchema({ typeDefs, resolvers })
}
