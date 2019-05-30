import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    if (object.__typename === 'VariationAttribute') {
      return `${object.__typename}:${object.key}`
    }
    return defaultDataIdFromObject(object)
  },
  cacheRedirects: {
    Query: {
      getCategory: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Category', id: args.id })
      },
      getProduct: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Product', id: args.id })
      }
    }
  }
})

function create(config = {}, initialState) {
  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache: cache.restore(initialState || {}),
    resolvers: {
      Mutation: {
        setSelectedProductId: (_root, variables, { cache, getCacheKey }) => {
          cache.writeData({ data: { selectedProductId: variables.id } })
          return null
        }
      }
    },
    ...config
  })

  cache.writeData({
    data: {
      selectedProductId: null
    }
  })

  return client
}

export default function initApollo(clientConfig, initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(clientConfig, initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(clientConfig, initialState)
  }

  return apolloClient
}
