import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '../gql'

const CART_QUERY = gql`
  query UserQuery {
    user {
      id
      type
      locale
      token
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

export const useCart = () => {
  const cartQuery = useQuery(CART_QUERY, { ssr: false })
  const addToCartMutation = useMutation(ADD_TO_CART_MUTATION)

  const addToCart = productId => {
    const { cart } = cartQuery.data.user
    addToCartMutation({
      variables: {
        basketId: cart.id,
        productId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addToCart: {
          __typename: 'Cart',
          id: cart.id,
          items: cart.items.concat({ id: productId, __typename: 'CartItem' })
        }
      }
    })
  }

  return [cartQuery, addToCart]
}
