import React from 'react'
import { Box, Flex } from '@64labs/ui'

const VariationSelector = ({ value, selected, disabled, onSelect, children }) => {
  return (
    <Flex
      ess={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        cursor: 'default'
      }}
      onClick={() => !disabled && onSelect(value)}
    >
      <Box
        ess={{
          opacity: disabled ? 0.5 : 1,
          position: 'relative',
          '&:after': selected
            ? {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 0,
                right: 0,
                height: '5px',
                borderBottom: '1px solid black'
              }
            : {}
        }}
      >
        {children}
      </Box>
    </Flex>
  )
}

export default VariationSelector
