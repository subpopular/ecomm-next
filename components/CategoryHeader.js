import React from 'react'
import gql from 'graphql-tag'
import { ApolloConsumer } from 'react-apollo'
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
    <Box px={3} py={4}>
      <Flex ess={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Text variant="h2">{category.name}</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default withRouter(CategoryHeader)
