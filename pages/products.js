import React from 'react'
import gql from 'graphql-tag'
import { Box } from '@64labs/ui'
import { useQuery } from '../lib/gql'
import { RootCategoryFragment } from '../lib/fragments'
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
    <Box px={[0, 3]}>
      <CategoryHeader />
      <CategoryHero />
      <CategoryProductList />
    </Box>
  )
}

export default ProductList
