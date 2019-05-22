const { ApolloServer } = require('apollo-server-micro')
const createServer = require('./graphql/server')

const server = createServer(ApolloServer)

module.exports = server.createHandler()
