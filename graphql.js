const { ApolloServer } = require('apollo-server')
const createServer = require('./graphql/server')

const server = createServer(ApolloServer)

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
