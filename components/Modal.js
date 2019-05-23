import React from 'react'
import { createPortal } from 'react-dom'
import { Flex, Box } from '@64labs/ui'

const Modal = ({ isOpen, children }) =>
  isOpen &&
  createPortal(
    <Flex variant="cover" position="fixed" zIndex={9999}>
      <Box variant="cover" position="fixed" bg="rgba(0,0,0,0.7)" zIndex={1} />
      <Box position="relative" m="auto" zIndex={2} width="100%">
        {children}
      </Box>
    </Flex>,
    document.body
  )

export default Modal
