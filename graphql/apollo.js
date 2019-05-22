import { HttpLink, ApolloLink, InMemoryCache } from 'apollo-boost'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import withApolloClient from './util/with-apollo-client'

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://ecomm-next.now.sh/graphql'
      : 'http://localhost:3000/graphql',
  credentials: 'same-origin'
  // useGETForQueries: true
})

const persistedQueryLink = createPersistedQueryLink({
  useGETForHashedQueries: true
})

// const apolloClientConfig = {
//   link: ApolloLink.from([persistedQueryLink, httpLink])
// }
const apolloClientConfig = {
  link: ApolloLink.from([httpLink])
}

export default App => withApolloClient(App, apolloClientConfig)
