import React from 'react'
import Link from 'next/link'
import { Menu as MenuIcon, ShoppingCart as CartIcon } from 'material-react-icons'
import { Flex, Box } from '@64labs/ui'
import Logo from './Logo'

const AppHeader = () => {
  return (
    <Flex height={40} px={3} ess={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Box ml={-1} display={['block', 'none']}>
        <MenuIcon styles={{ width: 20, height: 16, display: 'block' }} />
      </Box>
      <Box width={[130, 150]}>
        <Logo />
      </Box>
      <Box>
        <Link href="/cart">
          <CartIcon styles={{ width: 20, height: 18, display: 'block' }} />
        </Link>
      </Box>
    </Flex>
  )
}

export default AppHeader
