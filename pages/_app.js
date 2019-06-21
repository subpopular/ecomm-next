import 'intersection-observer'
import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import { useQuery } from '../lib/gql'
import apollo from '../graphql/apollo'
import theme, { GlobalStyle } from '../lib/theme'
import { addResolveFunctionsToSchema } from 'graphql-tools'

const USER_AUTH_QUERY = gql`
  query UserQuery {
    user {
      id
      type
      locale
      token
      cart {
        id
        items {
          id
        }
      }
    }
  }
`

const Root = ({ Component, ...props }) => {
  const { data, error, refetch } = useQuery(USER_AUTH_QUERY, { ssr: false })

  useEffect(() => {
    if (data && data.user) {
      localStorage.setItem('ae_token', data.user.token)
    }
    if (error) {
      const { code } = error.graphQLErrors[0].extensions
      if (code === 'UNAUTHENTICATED') {
        localStorage.removeItem('ae_token')
        refetch()
      }
    }
  }, [data, error])

  return <Component {...props} />
}

class AppWrapper extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloHooksProvider client={apolloClient}>
          <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
              <>
                <Head>
                  <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                  />
                </Head>
                <GlobalStyle />
                <Root Component={Component} {...pageProps} />
              </>
            </ThemeProvider>
          </ApolloProvider>
        </ApolloHooksProvider>
      </Container>
    )
  }
}

export default apollo(AppWrapper)
