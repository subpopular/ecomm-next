import React from 'react'
import { withRouter } from 'next/router'
import { Grid, Box, Text, Image } from '@64labs/ui'
import Layout from '../components/Layout'
import ProductBuyModule from '../components/ProductBuyModule'
import useProductDetail from '../lib/hooks/useProductDetail'

const ProductDetail = ({ router: { query } }) => {
  const [queryResponse, selections, variant] = useProductDetail(query.id)

  const { data, loading, error } = queryResponse

  if (loading) {
    return <Text>Loading</Text>
  }

  if (error) {
    return <Text>Error :(</Text>
  }

  const { product } = data

  return (
    <Layout>
      <Grid
        ess={{
          gridTemplateColumns: ['1fr', 'repeat(21, 1fr)'],
          gridColumnGap: 15,
          pt: 5,
          px: [3, 0]
        }}
      >
        <Box ess={{ gridColumn: ['auto', '15 / 20'] }}>
          <Box pt={[0, 5]} ess={{ position: 'sticky', top: 0 }}>
            <ProductBuyModule product={product} selections={selections} variant={variant} />
          </Box>
        </Box>

        <Box ess={{ gridColumn: ['auto', '2 / 13'], gridRow: [2, 1] }}>
          {selections.color.images.map(img => (
            <Image key={img.src} src={img.src} alt={img.alt} width={3} height={4} fluid mb={3} />
          ))}
        </Box>
      </Grid>
    </Layout>
  )
}

export default withRouter(ProductDetail)
