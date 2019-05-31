const { send } = require('micro')
const { ApolloServer } = require('apollo-server-micro')
const cors = require('micro-cors')({ allowMethods: ['PUT', 'POST', 'GET', 'OPTIONS'] })
const createServer = require('./graphql/server')

const plugins = {
  'gql-source-ocapi': require('./graphql/plugins/gql-source-ocapi')
}

const server = createServer(ApolloServer, plugins)
const handler = server.createHandler()

module.exports = cors((req, res) => {
  if (req.method === 'OPTIONS') {
    return send(res, 200, 'ok!')
  }
  return handler(req, res)
})
