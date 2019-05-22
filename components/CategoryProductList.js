import React from 'react'
import gql from 'graphql-tag'
import { ApolloConsumer, Query } from 'react-apollo'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { useQuery, useMutation } from '../lib/gql'
import { Box, Text, Flex, Grid, Image } from '@64labs/ui'

const productsQuery = gql`
  query products($categoryId: String!) {
    productList: getCategoryProductList(categoryId: $categoryId) {
      products {
        edges {
          node {
            id
            name
            price
            images {
              src
              alt
            }
          }
        }
      }
    }
  }
`

const selectProductMutation = gql`
  mutation setSelectedProductId($id: String!) {
    setSelectedProductId(id: $id) @client
  }
`

const ProductItem = ({ product, start, span, col }) => {
  const setSelectedProduct = useMutation(selectProductMutation, { variables: { id: product.id } })
  return (
    <Flex
      ess={{
        flexDirection: 'column',
        gridColumn: ['auto', `${start[col]} / span ${span[col]}`]
      }}
      onClick={setSelectedProduct}
    >
      <Box>
        <Image src={product.images[0].src} width={1335} height={1780} fluid />
      </Box>

      <Flex ess={{ flexDirection: 'column', pt: 2 }}>
        <Text variant="caption" ess={{ flex: '1 1 0', textTransform: 'capitalize', mb: 1 }}>
          {product.name}
        </Text>
        <Text variant="caption">{product.price}</Text>
      </Flex>
    </Flex>
  )
}

const ProductList = ({ router: { query } }) => {
  const { data, loading, error } = useQuery(productsQuery, {
    variables: {
      categoryId: query.cgid
    }
  })

  if (loading) {
    return <div>Loading.......</div>
  }

  if (error) {
    return <div>Error :(</div>
  }

  if (!data.productList.products) {
    return <div>No products here</div>
  }

  return (
    <Grid
      ess={{
        gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(21, 1fr)'],
        gridColumnGap: ['15px', '15px'],
        gridRowGap: ['45px', '100px'],
        p: 3
      }}
    >
      {data.productList.products.edges.map(({ node: product }, i) => {
        const col = i % 10
        const start = [2, 9, 16, 2, 16, 2, 9, 16, 9, 16]
        const span = [5, 5, 5, 10, 5, 5, 5, 5, 5, 5]

        return (
          <ProductItem
            key={`${product.id}-${i}`}
            product={product}
            start={start}
            span={span}
            col={col}
          />
        )
      })}
    </Grid>
  )
}

export default withRouter(ProductList)
