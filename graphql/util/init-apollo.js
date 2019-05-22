import { ApolloClient, InMemoryCache } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(config = {}, initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache: new InMemoryCache({
      cacheRedirects: {
        Query: {
          getCategory: (_, args, { getCacheKey }) => {
            console.log(args)
            return getCacheKey({ __typename: 'Category', id: args.id })
          }
        },
        Category: {
          categories: (root, args) => {
            console.log('ayyyyy', root)
            return root
          }
        }
      }
    }).restore(initialState || {}),
    ...config
  })
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
