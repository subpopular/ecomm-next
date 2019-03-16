const express = require('express')
const next = require('next')
const proxy = require('http-proxy-middleware')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const app = express()

    if (process.env.NODE_ENV !== 'production') {
      const { ApolloServer } = require('apollo-server-express')
      const gqlServer = require('./graphql/server')(ApolloServer)

      gqlServer.applyMiddleware({ app })
    }

    app.get('*', (req, res) => {
      return handle(req, res)
    })

    app.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
