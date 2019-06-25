import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Flex, Box, Text } from '@64labs/ui'

export const NotificationContext = React.createContext()

export const notificationsReducer = (state, action) => {
  if (action.type === 'add') {
    return [action.payload, ...state]
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
  const styles = useSpring({
    from: { transform: `translateY(24px)`, opacity: 0 },
    to: { transform: `translateY(0px)`, opacity: 1 },
    config: { tension: 454, friction: 38 }
  })

  return (
    <Box bg="primary" p={3}>
      <animated.div style={{ opacity: styles.opacity, transform: styles.transform }}>
        <Flex>
          <Text variant="h6" color="#fff" mx="auto">
            {children}
          </Text>
        </Flex>
      </animated.div>
    </Box>
  )
}

export default Notification
