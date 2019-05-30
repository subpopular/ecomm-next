import React, { Fragment, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '../lib/gql'
import { Button, Icon, Box, Flex, Text, Image } from '@64labs/ui'
import VariationSelector from './VariationSelector'
import SelectorGrid from './SelectorGrid'

const GET_CART_QUERY = gql`
  query GetCart {
    user {
      id
      cart {
        id
        items {
          id
        }
      }
    }
  }
`

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($basketId: String!, $productId: String!, $quantity: Int) {
    addToCart(basketId: $basketId, productId: $productId, quantity: $quantity) {
      id
      items {
        id
      }
    }
  }
`

const ProductBuyModule = ({ product, selections, variant }) => {
  const cartQuery = useQuery(GET_CART_QUERY)
  const addToCartMutation = useMutation(ADD_TO_CART_MUTATION)
  const {
    data: { user }
  } = cartQuery
  const { size, color } = selections
  const price = variant ? variant.pricing.max.toFixed(2) : product.price

  const addToCart = productId =>
    addToCartMutation({
      variables: {
        basketId: user.cart.id,
        productId
      }
    })

  return (
    <Fragment>
      <Box mb={3}>
        <Text mb={2} variant="caption">
          Lingerie - Bodysuits
        </Text>
        <Text as="h1" variant="h2" mb={1}>
          {product.name}
        </Text>
        <Text variant="h2">${price}</Text>
      </Box>

      <Box my={5}>
        {/* color selections */}
        <Flex mb={4}>
          <Box width={70}>
            <Text variant="caption" ess={{ lineHeight: '32px' }}>
              Color
            </Text>
          </Box>
          <SelectorGrid>
            {product.variationAttributes.color.map(c => (
              <VariationSelector
                key={c.id}
                value={c.id}
                selected={c.id === color.value}
                onSelect={color.setColor}
              >
                <Box ess={{ borderRadius: '50%', overflow: 'hidden', height: 13, width: 13 }}>
                  <Image
                    src={c.swatch.image.src}
                    alt={c.swatch.image.alt}
                    width={1}
                    height={1}
                    fluid
                  />
                </Box>
              </VariationSelector>
            ))}
          </SelectorGrid>
        </Flex>

        {/* size selections */}
        <Flex>
          <Box width={70}>
            <Text variant="caption" ess={{ lineHeight: '32px' }}>
              Size
            </Text>
          </Box>
          <SelectorGrid>
            {product.variationAttributes.size.map((s, idx) => (
              <VariationSelector
                key={s.id}
                value={s.id}
                selected={s.id === size.value}
                disabled={
                  !product.variants
                    .filter(v => v.color === color.value && v.orderable)
                    .map(v => v.size)
                    .includes(s.id)
                }
                onSelect={size.setSize}
              >
                <Text>{s.name}</Text>
              </VariationSelector>
            ))}
          </SelectorGrid>
        </Flex>
      </Box>

      <Flex mb={3}>
        <Button
          ml={[0, 'auto']}
          width="100%"
          disabled={!variant}
          onClick={() => addToCart(variant.id)}
        >
          Add
        </Button>
      </Flex>
    </Fragment>
  )
}

export default ProductBuyModule
