import React from 'react'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Box, Text, Flex, Grid, Button, Image } from '@64labs/ui'
import { useQuery } from '../lib/gql'

const categoryHeaderQuery = gql`
  query categoryHeader($id: String!) {
    category: getCategory(id: $id) {
      id
      name
    }
  }
`

const CategoryHeader = ({ router: { query } }) => {
  const { data, loading, error } = useQuery(categoryHeaderQuery, {
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

  return (
    <Box p={3}>
      <Flex ess={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Text variant="h2">{category.name}</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default withRouter(CategoryHeader)
