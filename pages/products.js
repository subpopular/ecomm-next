import React from 'react'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Box, Text, Flex, Grid, Button, Image } from '@64labs/ui'
import { useQuery } from '../lib/gql'
import CategoryHeader from '../components/CategoryHeader'
import CategoryHero from '../components/CategoryHero'
import CategoryProductList from '../components/CategoryProductList'

const categoryProductListQuery = gql`
  query category($id: String!) {
    category: getCategory(id: $id) {
      id
      name
      categories {
        edges {
          node {
            id
            name
            categories {
              edges {
                node {
                  id
                  name
                  categories {
                    edges {
                      node {
                        id
                        name
                        categories {
                          edges {
                            node {
                              id
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const ProductList = ({ router: { query } }) => {
  const { data, loading } = useQuery(categoryProductListQuery, {
    variables: {
      id: 'root'
    }
  })

  return (
    <Box>
      <Box px={[0, 3]}>
        <CategoryHeader />

        <CategoryHero />

        <CategoryProductList />
      </Box>
    </Box>
  )
}

export default withRouter(ProductList)
