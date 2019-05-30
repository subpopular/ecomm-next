import { gql, useQuery } from '../lib/gql'
import { Box, Text, Flex, Image } from '@64labs/ui'

const Cart = () => {
  const { data, error, loading } = useQuery(gql`
    query GetCart {
      cart @client {
        items
      }
    }
  `)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error!</div>
  }

  return (
    <Box>
      <Text>Cart</Text>
      {data.cart.items.map(item => (
        <Flex key={item}>
          <Text>{item}</Text>
        </Flex>
      ))}
    </Box>
  )
}

export default Cart
