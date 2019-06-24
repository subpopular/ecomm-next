import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '../gql'
import { ProductDetailFragment } from '../fragments'

export const useProductSelections = product => {
  const [selectedColor, setColor] = useState(null)
  const [selectedSize, setSize] = useState(null)
  const [variant, setVariant] = useState(null)

  useEffect(() => {
    if (product && !selectedColor && Array.isArray(product.variationAttributes.color)) {
      setColor(product.variationAttributes.color[0].id)
    }
    if (!product && selectedColor) {
      setColor(null)
    }
    if (!product && selectedSize) {
      setSize(null)
    }
  }, [product, selectedColor])

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const _variant = product.variants.find(
        v => v.color === selectedColor && v.size === selectedSize
      )
      if (!_variant.orderable) {
        setSize(null)
        setVariant(null)
      } else {
        setVariant(_variant)
      }
    }
  }, [selectedColor, selectedSize])

  const images =
    (selectedColor &&
      product &&
      product.variationAttributes.color.find(c => c.id === selectedColor).images) ||
    []

  const selections = {
    color: { value: selectedColor, images, setColor },
    size: { value: selectedSize, setSize }
  }

  return [selections, variant]
}

const useProductDetail = (productId, options = {}) => {
  const productQuery = gql`
    query productDetail($id: String!) {
      product: getProduct(id: $id) {
        ...ProductDetailFragment
        category {
          id
          name
          parentCategory {
            id
            name
          }
        }
      }
    }
    ${ProductDetailFragment}
  `

  const query = useQuery(productQuery, {
    variables: { id: productId },
    ...options,
    skip: options.skip || !productId
  })

  if (query.loading) {
    console.log('-> useProductDetail: loading query', options)
  }

  const [selections, variant] = useProductSelections(query.data && query.data.product)

  return [query, selections, variant]
}

export default useProductDetail
