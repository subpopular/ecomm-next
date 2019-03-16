import { gql, useQuery } from '../lib/gql'
import { Box, Text, Flex, Image } from '@64labs/ui'

const Cart = () => {
  const { data, error, loading } = useQuery(gql`
    query getCart {
      cart: getCart {
        items {
          id
          name
          path
          price
          brand
          thumbnail {
            src
          }
        }
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
      {data.cart.items.map(item => (
        <Flex key={item.id}>
          <Box ess={{ width: 104, height: 104, mr: 3, border: '1px solid #EEE' }}>
            <Image src={item.thumbnail.src} />
          </Box>

          <Box>
            <Text variant="h3">{item.name}</Text>
            <Text variant="caption" ess={{ mb: 3 }}>
              {item.brand}
            </Text>
            <Text variant="label">${item.price}</Text>
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

export default Cart
