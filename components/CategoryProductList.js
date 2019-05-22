import React from 'react'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from '../lib/gql'
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
        gridColumnGap: ['1px', '15px'],
        gridRowGap: ['1px', '100px'],
        p: [0, 3]
      }}
    >
      {data.productList.products.edges.map(({ node: product }, i) => {
        const col = i % 10
        const start = [2, 9, 16, 2, 16, 2, 9, 16, 9, 16]
        const span = [5, 5, 5, 10, 5, 5, 5, 5, 5, 5]

        return (
          <Flex
            key={`${product.id}-${i}`}
            ess={{
              flexDirection: 'column',
              gridColumn: `${start[col]} / span ${span[col]}`
            }}
          >
            <Box ess={{ px: [3, 0], pt: [3, 0] }}>
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
      })}
    </Grid>
  )
}

export default withRouter(ProductList)
