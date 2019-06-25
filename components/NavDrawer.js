import React from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useSpring, useTrail, animated } from 'react-spring'
import { Box, Text } from '@64labs/ui'
import { useQuery } from '../lib/gql'
import { RootCategoryFragment } from '../lib/fragments'

const categoriesQuery = gql`
  query category($id: String!) {
    root: getCategory(id: $id) {
      ...RootCategoryFragment
    }
  }
  ${RootCategoryFragment}
`

const navItems = [
  {
    id: '1A',
    label: 'Top Level 1',
    children: [
      { id: '1A-1', label: 'Second Level 1' },
      { id: '1A-2', label: 'Second Level 2' },
      { id: '1A-3', label: 'Second Level 3' }
    ]
  },
  {
    id: '2A',
    label: 'Top Level 2',
    children: [
      { id: '2A-1', label: 'Second Level 1' },
      { id: '2A-2', label: 'Second Level 2' },
      { id: '2A-3', label: 'Second Level 3' }
    ]
  },
  {
    id: '3A',
    label: 'Top Level 3',
    children: [
      { id: '3A-1', label: 'Second Level 1' },
      { id: '3A-2', label: 'Second Level 2' },
      { id: '3A-3', label: 'Second Level 3' },
      { id: '3A-4', label: 'Second Level 4' },
      { id: '3A-5', label: 'Second Level 5' }
    ]
  },
  {
    id: '4A',
    label: 'Top Level 4',
    children: [
      { id: '4A-1', label: 'Second Level 1' },
      { id: '4A-2', label: 'Second Level 2' },
      { id: '4A-3', label: 'Second Level 3' },
      { id: '4A-4', label: 'Second Level 4' },
      { id: '4A-5', label: 'Second Level 5' }
    ]
  },
  {
    id: '5A',
    label: 'Top Level 5',
    children: [
      { id: '5A-1', label: 'Second Level 1' },
      { id: '5A-2', label: 'Second Level 2' },
      { id: '5A-3', label: 'Second Level 3' },
      { id: '5A-4', label: 'Second Level 4' },
      { id: '5A-5', label: 'Second Level 5' }
    ]
  }
]

const navReducer = (state, { type, payload }) => {
  if (type === 'next') {
    return {
      ...state,
      level: state.level + 1,
      selectedItem: payload.item,
      itemBounds: payload.bounds
    }
  }

  return state
}

const Item = ({ item, y }) => {
  console.log(item)
  const springProps = useSpring({
    from: { transform: `translateY(${y}px)`, fontSize: 12, padding: '8px 0px' },
    to: { transform: `translateY(0px)`, fontSize: 18, padding: '0px 0px' },
    config: { tension: 400, friction: 36 },
    delay: 200
  })

  const itemsSpring = useSpring({
    from: { opacity: 0.01, transform: `translateX(${20}px)` },
    to: { opacity: 0.99, transform: `translateX(0px)` },
    config: { mass: 6, tension: 2000, friction: 260 },
    delay: 500
  })

  return (
    <Box css={{ position: 'relative' }}>
      <animated.div style={springProps}>
        <Text fontSize="inherit">{item.name}</Text>
      </animated.div>

      <Box css={{ position: 'absolute', top: 32 }}>
        {item.categories.edges.map(({ node }) => (
          <animated.div style={itemsSpring} key={node.id}>
            <Box py={2}>
              <Text>{node.name}</Text>
            </Box>
          </animated.div>
        ))}
      </Box>
    </Box>
  )
}

const NavDrawer = () => {
  const { data, loading } = useQuery(categoriesQuery, { variables: { id: 'root' } })

  const [refMap] = React.useState(() => new WeakMap())
  const [state, dispatch] = React.useReducer(navReducer, {
    open: true,
    level: 1,
    selectedItem: null,
    itemBounds: null
  })

  const level1Props = useSpring({ opacity: state.level === 1 ? 1 : 0 })

  const y = state.itemBounds ? state.itemBounds.y : 0

  const onSelect = item => {
    const bounds = { y: refMap.get(item).offsetTop - 32 }
    dispatch({
      type: 'next',
      payload: { item, bounds }
    })
  }

  return (
    <Box
      bg="white"
      width={200}
      height="100vh"
      css={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
    >
      <Box
        p={4}
        css={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' }}
      >
        <animated.div style={level1Props}>
          {data.root.categories.edges.map(({ node: item }) => (
            <Box
              key={item.id}
              ref={ref => ref && refMap.set(item, ref)}
              py={2}
              onClick={() => onSelect(item)}
            >
              <Text>{item.name}</Text>
            </Box>
          ))}
        </animated.div>
      </Box>

      {state.selectedItem && (
        <Box
          p={4}
          css={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' }}
        >
          <Item item={state.selectedItem} y={y} />
        </Box>
      )}
    </Box>
  )
}

export default NavDrawer
