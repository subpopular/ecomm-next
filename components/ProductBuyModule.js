import React from 'react'
import { Button, Box, Flex, Text, Image } from '@64labs/ui'
import { useCart } from '../lib/hooks/useCart'
import VariationSelector from './VariationSelector'
import SelectorGrid from './SelectorGrid'

const ProductBuyModule = ({ product, selections, variant }) => {
  const [cartQuery, addToCart] = useCart()
  const { size, color } = selections
  const price = variant ? variant.pricing.max.toFixed(2) : product.price.toFixed(2)

  const categoryName = product.category ? product.category.name : null
  const parentCategoryName = categoryName ? product.category.parentCategory.name : null

  return (
    <>
      <Box mb={3}>
        <Text mb={2} variant="caption">
          {parentCategoryName} – {categoryName}
        </Text>
        <Text as="h1" variant="h2" mb={1}>
          {product.name}
        </Text>
        <Text variant="h2">${price}</Text>
      </Box>

      <Box my={5}>
        {/* color selections */}
        <Flex mb={4}>
          <Box width={60}>
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
          <Box width={60}>
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
                {s.name}
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
    </>
  )
}

export default ProductBuyModule
