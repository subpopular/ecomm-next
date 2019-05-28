import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '../gql'
import { ProductDetailFragment } from '../fragments'

export const useProductSelections = product => {
  const [selectedColor, setColor] = useState(null)
  const [selectedSize, setSize] = useState(null)
  const [variant, setVariant] = useState(null)

  useEffect(() => {
    if (product && !selectedColor) {
      if (Array.isArray(product.variationAttributes.color)) {
        setColor(product.variationAttributes.color[0].id)
      } else {
        console.log(product)
      }
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

const useProductDetail = productId => {
  const productQuery = gql`
    query productDetail($id: String!) {
      product: getProduct(id: $id) {
        ...ProductDetailFragment
      }
    }
    ${ProductDetailFragment}
  `

  const query = useQuery(productQuery, { variables: { id: productId }, skip: !productId })

  const [selections, variant] = useProductSelections(query.data && query.data.product)

  return [query, selections, variant]
}

export default useProductDetail
