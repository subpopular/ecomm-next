import React from 'react'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import { useQuery } from '../lib/gql'
import { RootCategoryFragment } from '../lib/fragments'
import { Box, Flex, Text, Image } from '@64labs/ui'
import CategoryHeader from '../components/CategoryHeader'
import CategoryHero from '../components/CategoryHero'
import CategoryProductList from '../components/CategoryProductList'

const productQuery = gql`
  query productDetail($id: String!) {
    product: getProduct(id: $id) {
      id
      name
      price
      images {
        src
        alt
      }
    }
  }
`

const ProductDetail = ({ router: { query } }) => {
  const { data, loading, error } = useQuery(productQuery, {
    variables: {
      id: query.id
    }
  })

  if (loading) {
    return <Text>Loading</Text>
  }

  if (error) {
    return <Text>Error :(</Text>
  }

  const { product } = data

  return (
    <Box px={[0, 3]}>
      <Box width="50%">
        <Image src={product.images[0].src} width={3} height={4} fluid />
      </Box>
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
    </Box>
  )
}

export default withRouter(ProductDetail)
