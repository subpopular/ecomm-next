import React, { useState } from 'react'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '../lib/gql'
import { RootCategoryFragment } from '../lib/fragments'
import { Menu as MenuIcon, ShoppingCart as CartIcon } from 'material-react-icons'
import { Box, Flex } from '@64labs/ui'
import Logo from '../components/Logo'
import CategoryHeader from '../components/CategoryHeader'
import CategoryHero from '../components/CategoryHero'
import CategoryProductList from '../components/CategoryProductList'
import ProductDetailModal from '../components/ProductDetailModal'

const categoryProductListQuery = gql`
  query category($id: String!) {
    category: getCategory(id: $id) {
      ...RootCategoryFragment
    }
  }
  ${RootCategoryFragment}
`

const useProductRouteModal = router => {
  const [isModalOpen, setModalState] = useState(false)
  const [prevPathname, setPrevPathname] = useState(router.asPath)
  const closeModal = () => {
    setModalState(false)
    Router.replace(prevPathname)
  }
  const openModal = (e, product) => {
    e.preventDefault()
    setPrevPathname(router.asPath)
    setModalState(true)
    Router.push(`${router.asPath}&pid=${product.id}`, `/product?id=${product.id}`, {
      shallow: true
    })
  }
  return [isModalOpen, openModal, closeModal]
}

const ProductList = ({ router }) => {
  useQuery(categoryProductListQuery, { variables: { id: 'root' } })

  const [isProductModalOpen, openProductModal, closeProductModal] = useProductRouteModal(router)

  return (
    <>
      <Flex height={40} px={3} ess={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box ml={-1}>
          <MenuIcon styles={{ width: 20, height: 16, display: 'block' }} />
        </Box>
        <Box width={[130, 160]}>
          <Logo />
        </Box>
        <Box>
          <Link href="/cart">
            <CartIcon styles={{ width: 20, height: 18, display: 'block' }} />
          </Link>
        </Box>
      </Flex>

      <Box px={[0, 3]}>
        <CategoryHeader />
        <CategoryHero />
        <CategoryProductList onProductClick={openProductModal} />
      </Box>

      <ProductDetailModal
        selectedProductId={router.query.pid}
        isOpen={isProductModalOpen}
        close={closeProductModal}
      />
    </>
  )
}

export default withRouter(ProductList)
