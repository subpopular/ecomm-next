import React from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import { Menu as MenuIcon, ShoppingCart as CartIcon } from 'material-react-icons'
import { Flex, Box, Grid, Text } from '@64labs/ui'
import { useQuery } from '../lib/gql'
import { RootCategoryFragment } from '../lib/fragments'
import Logo from './Logo'

const categoriesQuery = gql`
  query category($id: String!) {
    category: getCategory(id: $id) {
      ...RootCategoryFragment
    }
  }
  ${RootCategoryFragment}
`

const AppHeader = () => {
  const { data, loading } = useQuery(categoriesQuery, { variables: { id: 'root' } })

  const { category } = data

  return (
    <>
      <Flex
        as="header"
        height={[40, 60]}
        pt={[0, 3]}
        px={[3, 4]}
        ess={{
          background: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: ['sticky', 'static'],
          zIndex: 2,
          top: 0
        }}
      >
        <Box ml={-1} display={['block', 'none']}>
          <MenuIcon styles={{ width: 20, height: 16, display: 'block' }} />
        </Box>
        <Box width={[130, 200]}>
          <Logo />
        </Box>
        <Box ess={{ display: ['block', 'none'] }}>
          <Link href="/cart">
            <CartIcon styles={{ width: 20, height: 18, display: 'block' }} />
          </Link>
        </Box>
      </Flex>
      <Flex
        as="nav"
        px={[3, 4]}
        ess={{
          display: ['none', 'flex'],
          alignItems: 'center',
          background: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 2
        }}
      >
        <Flex
          as="ul"
          height={50}
          ess={{
            alignItems: 'center',
            flex: '1 1 0',
            '& > li + li': {
              ml: 3
            }
          }}
        >
          {category &&
            category.categories.edges.map(({ node }) => (
              <Box as="li" key={node.id} ess={{ listStyle: 'none' }}>
                <Text>
                  <Link href={`/products?cgid=${node.id}`}>
                    <a>{node.name}</a>
                  </Link>
                </Text>
              </Box>
            ))}
        </Flex>
        <Box>
          <Link href="/cart">
            <CartIcon styles={{ width: 20, height: 18, display: 'block' }} />
          </Link>
        </Box>
      </Flex>
    </>
  )
}

export default AppHeader
