import React from 'react'
import AppHeader from './AppHeader'
import { Box, Flex } from '@64labs/ui'

const Layout = ({ children }) => {
  return (
    <Flex>
      <Box
        ess={{
          mx: 'auto',
          width: '100%',
          maxWidth: 1280
        }}
      >
        <AppHeader />
        {children}
      </Box>
    </Flex>
  )
}

export default Layout
