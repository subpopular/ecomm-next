const { MockList } = require('apollo-server')
const casual = require('casual')
const merge = require('lodash/merge')
const { createSchema } = require('./schemas')

const plugins = {
  'gql-source-lumens': require('./plugins/gql-source-lumens')
}

let typeDefs = []
let resolvers = {}
let dataSources = {}

const concatTypeDefs = _typeDefs => (typeDefs = typeDefs.concat(_typeDefs))
const mergeResolvers = _resolvers => (resolvers = merge(resolvers, _resolvers))
const addDataSource = (dsKey, ds) => (dataSources[dsKey] = ds)

Object.keys(plugins).forEach(key => {
  const { onCreateSchema, onCreateDataSources } = plugins[key]
  if (onCreateSchema) {
    onCreateSchema({ concatTypeDefs, mergeResolvers })
  }
  if (onCreateDataSources) {
    onCreateDataSources({ addDataSource })
  }
})

const schema = createSchema({ typeDefs, resolvers })

module.exports = ApolloServer =>
  new ApolloServer({
    schema,
    dataSources: () =>
      Object.keys(dataSources).reduce((a, b) => {
        return {
          ...a,
          [b]: new dataSources[b]()
        }
      }, {}),
    context: ({ req, res }) => {
      return {
        cookie: req.headers['x-cookie-payload']
      }
    },
    introspection: true,
    tracing: true,
    cacheControl: { defaultMaxAge: 5 },
    playground: true,
    mocks: {
      ProductList: () => ({
        edges: () => new MockList([20, 20])
      }),
      Product: () => ({
        id: () => Math.floor(Date.now() * Math.random()),
        name: casual.title,
        thumbnail: root => ({
          src: `https://picsum.photos/300/?random=${root.id()}`
        }),
        basePrice: () => `$${casual.double(50, 1500).toFixed(2)}`,
        brand: casual.company_name
      })
    }
  })
