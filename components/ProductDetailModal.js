import React, { useState, useEffect } from 'react'
import { KeyboardBackspace as BackArrow } from 'material-react-icons'
import { Grid, Box, Button, Image } from '@64labs/ui'
import Modal from './Modal'
import useProductDetail from '../lib/hooks/useProductDetail'
import ProductBuyModule from './ProductBuyModule'

const ProductDetailModal = ({ isOpen, close, selectedProductId }) => {
  const [capturedProductId, setCapturedProductId] = useState(selectedProductId)

  const [{ data }, selections, variant] = useProductDetail(capturedProductId, { skip: !isOpen })

  useEffect(() => {
    if (selectedProductId && !capturedProductId) {
      setCapturedProductId(selectedProductId)
    }
    if (!selectedProductId && capturedProductId) {
      close()
      setTimeout(() => {
        setCapturedProductId(selectedProductId)
      }, 400)
    }
  }, [capturedProductId, selectedProductId])

  if (!data || !data.product) {
    return null
  }

  const { product } = data

  return (
    <Modal isOpen={isOpen}>
      <Grid
        ess={{
          gridTemplateColumns: ['1fr', 'repeat(21, 1fr)'],
          gridColumnGap: 15,
          px: [0, 3],
          mx: 'auto',
          maxWidth: 1280,
          width: '100%'
        }}
      >
        <Box
          bg="white"
          height="100vh"
          width="100%"
          mx="auto"
          ess={{ overflow: 'auto', gridColumn: ['auto', '1 / span 21'] }}
        >
          <Box>
            <Button variant="icon" m={2} aria-label="back" onClick={close}>
              <BackArrow />
            </Button>
          </Box>

          <Grid
            ess={{
              gridTemplateColumns: ['1fr', 'repeat(21, 1fr)'],
              gridColumnGap: 15,
              px: [3, 0]
            }}
          >
            <Box ess={{ gridColumn: ['auto', '16 / 20'] }}>
              <Box ess={{ position: 'sticky', top: 0, pt: [0, 5] }}>
                <ProductBuyModule product={product} selections={selections} variant={variant} />
              </Box>
            </Box>

            <Box ess={{ gridColumn: ['auto', '2 / 14'], gridRow: [2, 1] }}>
              {selections.color.images.map(img => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={3}
                  height={4}
                  fluid
                  mb={3}
                />
              ))}
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Modal>
  )
}

export default ProductDetailModal
