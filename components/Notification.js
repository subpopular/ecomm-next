import React from 'react'
import { useSpring, useTrail, animated } from 'react-spring'
import { Flex, Box, Text } from '@64labs/ui'
import useMeasure from 'use-measure'

export const NotificationContext = React.createContext()

export const notificationsReducer = (state, action) => {
  if (action.type === 'add') {
    return state.concat(action.payload)
  }

  if (action.type === 'remove') {
    return state.filter(n => n.id !== action.payload.id)
  }

  return state
}

export const NotificationsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(notificationsReducer, [])

  const add = (content, options = {}) => {
    const { duration = 4000 } = options
    const id = Date.now()
    dispatch({ type: 'add', payload: { id, content } })
    setTimeout(() => {
      dispatch({ type: 'remove', payload: { id } })
    }, duration)
  }

  const remove = id => {
    dispatch({ type: 'remove', payload: { id } })
  }

  return (
    <NotificationContext.Provider value={[state, { add, remove }]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => React.useContext(NotificationContext)

const Notification = ({ children }) => {
  const nodeRef = React.useRef()
  const { height } = useMeasure(nodeRef)
  const [outerStyles, innerStyles] = useTrail(2, {
    from: { transform: `translateY(-15px)`, opacity: 0 },
    to: { transform: `translateY(0px)`, opacity: 1 },
    config: {
      tension: 454,
      friction: 36
    }
  })

  return (
    <animated.div
      style={{
        opacity: outerStyles.opacity,
        transform: outerStyles.transform,
        overflow: 'hidden'
      }}
    >
      <Box bg="primary" ref={nodeRef}>
        <Box p={3}>
          <animated.div style={{ opacity: innerStyles.opacity, transform: innerStyles.transform }}>
            <Flex>
              <Text variant="h6" color="#fff" mx="auto">
                {children}
              </Text>
            </Flex>
          </animated.div>
        </Box>
      </Box>
    </animated.div>
  )
}

export default Notification
