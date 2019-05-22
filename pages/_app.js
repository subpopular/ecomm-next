import 'intersection-observer'
import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import apollo from '../graphql/apollo'
import theme, { GlobalStyle } from '../lib/theme'

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
                <Component {...pageProps} />
              </>
            </ThemeProvider>
          </ApolloProvider>
        </ApolloHooksProvider>
      </Container>
    )
  }
}

export default apollo(AppWrapper)
