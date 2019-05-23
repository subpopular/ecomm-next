import React from 'react'
import gql from 'graphql-tag'
import { Box, Flex } from '@64labs/ui'
import { Menu as MenuIcon, ShoppingCartOutlined as CartIcon } from 'material-react-icons'
import { useQuery } from '../lib/gql'
import { RootCategoryFragment } from '../lib/fragments'
import Logo from '../components/Logo'
import CategoryHeader from '../components/CategoryHeader'
import CategoryHero from '../components/CategoryHero'
import CategoryProductList from '../components/CategoryProductList'

const categoryProductListQuery = gql`
  query category($id: String!) {
    category: getCategory(id: $id) {
      ...RootCategoryFragment
    }
  }
  ${RootCategoryFragment}
`

const ProductList = () => {
  useQuery(categoryProductListQuery, {
    variables: {
      id: 'root'
    }
  })

  return (
    <>
      <Flex height={40} px={3} ess={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box ml={-1}>
          <MenuIcon styles={{ width: 20, height: 16, verticalAlign: 'initial' }} />
        </Box>
        <Box
          width={130}
          ess={{
            '& > svg': {
              display: 'block'
            }
          }}
        >
          <Logo />
        </Box>
        <Box>
          <CartIcon styles={{ width: 20, height: 18, verticalAlign: 'initial' }} />
        </Box>
      </Flex>

      <Box px={[0, 3]}>
        <CategoryHeader />
        <CategoryHero />
        <CategoryProductList />
      </Box>
    </>
  )
}

export default ProductList
