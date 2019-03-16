import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Box, Text, Flex, Grid, Button, Image } from '@64labs/ui'

const productsQuery = gql`
  query products($path: String!) {
    products: getProducts(path: $path) {
      edges {
        node {
          id
          name
          brand
          basePrice
          thumbnail {
            src
          }
        }
      }
    }
  }
`

const ProductList = () => {
  const { data, loading, error, refetch } = useQuery(productsQuery, {
    variables: {
      path: '/dining-room-tables/'
    },
    suspend: false
  })

  if (loading) {
    return <div>Loading.......</div>
  }

  if (error) {
    return <div>Error :(</div>
  }

  return (
    <Box ess={{ minHeight: '100vh', bg: 'palette.grey.50' }}>
      <Box variant="container" px={[0, 3]}>
        <Box ess={{ p: 3 }}>
          <Flex ess={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Text variant="h1">Product List</Text>
            <Button variant="secondary" onClick={() => refetch()}>
              Refetch
            </Button>
          </Flex>

          <Box>
            <Text variant="subtitle">Showing all Tables</Text>
          </Box>
        </Box>
        <Grid
          ess={{
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(auto-fill, minmax(180px, 1fr))'],
            gridGap: ['1px', 3],
            p: [0, 3]
          }}
        >
          {data.products.edges.map(({ node: product }) => (
            <Flex key={product.id} ess={{ flexDirection: 'column', bg: 'white' }}>
              <Box ess={{ px: [3, 0], pt: [3, 0] }}>
                <Image src={product.thumbnail.src} width={1} height={1} fluid />
              </Box>

              <Flex ess={{ flexDirection: 'column', flex: '1 1 auto', p: 3, pt: 2 }}>
                <Text variant="title" ess={{ flex: '1 1 0', textTransform: 'capitalize', mb: 1 }}>
                  {product.name}
                </Text>
                <Text variant="caption">{product.brand}</Text>
                <Text variant="h4" mt={2}>
                  {product.basePrice}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default ProductList
