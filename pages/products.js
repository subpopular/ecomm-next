import React, { useState } from 'react'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '../lib/gql'
import { RootCategoryFragment } from '../lib/fragments'
import { Box } from '@64labs/ui'
import Layout from '../components/Layout'
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
    <Layout>
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
    </Layout>
  )
}

export default withRouter(ProductList)
