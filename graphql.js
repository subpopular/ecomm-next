const { ApolloServer } = require('apollo-server-micro')
const createServer = require('./graphql/server')

const plugins = {
  'gql-source-ocapi': require('./graphql/plugins/gql-source-ocapi')
}

const server = createServer(ApolloServer, plugins)

module.exports = server.createHandler()
