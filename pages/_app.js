import 'intersection-observer'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import gql from 'graphql-tag'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import { useTransition, animated } from 'react-spring'
import { Box } from '@64labs/ui'
import { useQuery } from '../lib/gql'
import apollo from '../graphql/apollo'
import theme, { GlobalStyle } from '../lib/theme'
import { RootCategoryFragment } from '../lib/fragments'
import Notification, { NotificationsProvider, useNotifications } from '../components/Notification'

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

const categoryProductListQuery = gql`
  query category($id: String!) {
    category: getCategory(id: $id) {
      ...RootCategoryFragment
    }
  }
  ${RootCategoryFragment}
`

const Root = ({ Component, ...props }) => {
  const { data, error, refetch } = useQuery(USER_AUTH_QUERY, { ssr: false })

  const rootCategoryQuery = useQuery(categoryProductListQuery, { variables: { id: 'root' } })

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

  if (!rootCategoryQuery.data || !rootCategoryQuery.data.category) {
    return null
  }

  return <Component {...props} />
}

const NotificationsContainer = () => {
  const [isBrowser, setIsBrowser] = React.useState(false)

  const [notifications] = useNotifications()

  const transitions = useTransition(notifications, item => item.id, {
    from: { height: 0, opacity: 0.01, overflow: 'hidden' },
    enter: { height: 48, opacity: 0.99 },
    leave: [{ height: 48, opacity: 0.01 }],
    config: { tension: 454, friction: 40 }
  })

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) {
    return null
  }

  return createPortal(
    <Box ess={{ position: 'fixed', top: 0, width: '100%', zIndex: 99 }}>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Notification>{item.content}</Notification>
        </animated.div>
      ))}
    </Box>,
    document.body
  )
}

class AppWrapper extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloHooksProvider client={apolloClient}>
          <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
              <NotificationsProvider>
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
                  <NotificationsContainer />
                </>
              </NotificationsProvider>
            </ThemeProvider>
          </ApolloProvider>
        </ApolloHooksProvider>
      </Container>
    )
  }
}

export default apollo(AppWrapper)
