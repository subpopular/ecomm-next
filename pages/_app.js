import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from 'react-apollo-hooks'
import { ThemeProvider } from 'emotion-theming'
import apollo from '../graphql/apollo'
import theme, { GlobalStyle } from '../lib/theme'

class AppWrapper extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
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
      </Container>
    )
  }
}

export default apollo(AppWrapper)
