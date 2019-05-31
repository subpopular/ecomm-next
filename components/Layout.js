import React from 'react'
import AppHeader from './AppHeader'

const Layout = ({ children }) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}

export default Layout
