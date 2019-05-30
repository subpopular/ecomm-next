import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import withApolloClient from './util/with-apollo-client'

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://ecomm-next.now.sh/graphql'
      : 'http://localhost:3000/graphql',
  credentials: 'same-origin'
  // useGETForQueries: true
})

const authLink = setContext((_, { headers }) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('ae_token')
    return {
      headers: {
        ...headers,
        authorization: token || ''
      }
    }
  }
  return { headers }
})

const persistedQueryLink = createPersistedQueryLink({
  useGETForHashedQueries: true
})

// const apolloClientConfig = {
//   link: ApolloLink.from([persistedQueryLink, httpLink])
// }
const apolloClientConfig = {
  link: authLink.concat(httpLink)
}

export default App => withApolloClient(App, apolloClientConfig)
