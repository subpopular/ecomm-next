import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { useMutation } from '../lib/gql'
import { Box, Text, Flex, Image, Button } from '@64labs/ui'
import { KeyboardBackspace as BackArrow } from 'material-react-icons'
import Modal from './Modal'

const ProductItem = ({ product, start, span, col, router }) => {
  const [isModalOpen, setModalState] = React.useState(false)

  const toggleModal = () => {
    setModalState(!isModalOpen)
  }

  const popProductModal = e => {
    e.preventDefault()
    setModalState(true)
  }

  return (
    <>
      <Link href={`/product?id=${product.id}`} prefetch>
        <Flex
          as="a"
          ess={{
            flexDirection: 'column',
            gridColumn: ['auto', `${start[col]} / span ${span[col]}`]
          }}
          onClick={popProductModal}
        >
          <Box>
            <Image src={product.images[0].src} width={1335} height={1780} fluid />
          </Box>

          <Flex ess={{ flexDirection: 'column', pt: 2 }}>
            <Text ess={{ flex: '1 1 0', textTransform: 'capitalize', mb: 1 }}>{product.name}</Text>
            <Text>{product.price}</Text>
          </Flex>
        </Flex>
      </Link>

      <Modal isOpen={isModalOpen}>
        <Box
          bg="white"
          height="100vh"
          width="100%"
          mx="auto"
          ess={{ maxWidth: 768, overflow: 'auto' }}
        >
          <Box>
            <Button variant="icon" m={2} aria-label="back" onClick={toggleModal}>
              <BackArrow />
            </Button>
          </Box>

          <Box m={3}>
            <Box mb={3}>
              <Text mb={2} variant="caption">
                Lingerie - Bodysuits
              </Text>
              <Text as="h1" variant="h2" mb={1}>
                {product.name}
              </Text>
              <Text variant="h2">${product.price}</Text>
            </Box>

            <Flex mb={3}>
              <Button ml="auto">Add</Button>
            </Flex>

            <Box width={['100%', '50%']}>
              {product.images.map(img => (
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

            <Button mt={3} onClick={toggleModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default withRouter(ProductItem)
