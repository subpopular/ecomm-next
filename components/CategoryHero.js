import React from 'react'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Box, Text, Flex, Grid, Button, Image } from '@64labs/ui'
import { useQuery } from '../lib/gql'

const categoryProductListQuery = gql`
  query categoryHero($id: String!) {
    category: getCategory(id: $id) {
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
`

const CategoryHero = ({ router: { query } }) => {
  const { data, loading, error } = useQuery(categoryProductListQuery, {
    variables: {
      id: query.cgid
    }
  })

  if (loading) {
    return <div>Loading.......</div>
  }

  if (error) {
    return <div>Error :(</div>
  }

  const { category } = data
  const { categories } = category

  return (
    <Box p={3} mb={4}>
      {categories &&
        categories.edges.map(({ node }) => (
          <Text as="h3" fontWeight="normal" py={1} key={node.name}>
            <Link href={`/products?cgid=${node.id}`}>
              <a>{node.name}</a>
            </Link>
          </Text>
        ))}
    </Box>
  )
}

export default withRouter(CategoryHero)
