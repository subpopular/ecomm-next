import React from 'react'
import gql from 'graphql-tag'
import { ApolloConsumer, Query } from 'react-apollo'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from '../lib/gql'
import { Box, Text, Flex, Grid, Image } from '@64labs/ui'

const query = gql`
  query product($id: String!) {
    product: getProduct(id: $id) {
      id
      name
    }
  }
`

const ProductMiniDetail = ({ id }) => {
  const { data } = useQuery(query, {
    variables: { id },
    skip: !id
  })

  if (!data || !data.product) {
    return null
  }

  const { product } = data

  return (
    <Box>
      <Text>
        {product.name} - {product.id}
      </Text>
    </Box>
  )
}

export default ProductMiniDetail
