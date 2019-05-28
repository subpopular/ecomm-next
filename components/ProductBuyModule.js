import React, { Fragment, useState, useEffect } from 'react'
import { Grid, Button, Icon, Box, Flex, Text, Image } from '@64labs/ui'

const VariationSelector = ({ value, selected, disabled, onSelect, children }) => {
  return (
    <Flex
      ess={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        cursor: 'default'
      }}
      onClick={() => !disabled && onSelect(value)}
    >
      <Box
        ess={{
          opacity: disabled ? 0.5 : 1,
          position: 'relative',
          '&:after': selected
            ? {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 0,
                right: 0,
                height: '6px',
                borderBottom: '1px solid black'
              }
            : {}
        }}
      >
        {children}
      </Box>
    </Flex>
  )
}

const SelectorGrid = ({ children }) => (
  <Grid
    ess={{
      flex: '1 1 0',
      gridTemplateColumns: ['auto', 'repeat(auto-fill, minmax(40px, 1fr))'],
      gridColumnGap: '5px',
      gridRowGap: '10px'
    }}
  >
    {children}
  </Grid>
)

const ProductBuyModule = ({ product, selections, variant }) => {
  const { size, color } = selections
  const price = variant ? variant.pricing.max.toFixed(2) : product.price

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
                <Box ess={{ borderRadius: '50%', overflow: 'hidden', height: 15, width: 15 }}>
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
        <Button ml={[0, 'auto']} width="100%">
          Add
        </Button>
      </Flex>
    </Fragment>
  )
}

export default ProductBuyModule
