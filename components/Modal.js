import React from 'react'
import { createPortal } from 'react-dom'
import { useSpring, animated } from 'react-spring'
import { Flex, Box } from '@64labs/ui'

const ModalPortal = ({ isOpen, children }) => {
  const { opacity, y } = useSpring({
    opacity: isOpen ? 1 : 0,
    from: { opacity: 0 },
    config: {
      friction: 25,
      tension: 200
    }
  })
  return (
    <Flex variant="cover" position="fixed">
      <animated.div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
          background: 'rgba(0,0,0,0.7)',
          opacity
        }}
      />

      <animated.div
        style={{
          position: 'relative',
          margin: 'auto',
          width: '100%',
          zIndex: 2,
          opacity
        }}
      >
        {children}
      </animated.div>
    </Flex>
  )
}

const Modal = ({ isOpen, children }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  React.useEffect(() => {
    if (showModal && !isOpen) {
      setTimeout(() => {
        setShowModal(false)
      }, 300)
    } else if (isOpen && !showModal) {
      setShowModal(true)
    }
  }, [isOpen])

  return (
    showModal && createPortal(<ModalPortal children={children} isOpen={isOpen} />, document.body)
  )
}

export default Modal
