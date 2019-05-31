import React from 'react'
import { Box, Flex, Button } from '@64labs/ui'

const VariationSelector = ({ value, selected, disabled, onSelect, children }) => {
  return (
    <Button onClick={() => !disabled && onSelect(value)} height={32} variant="wrapper">
      <Flex
        ess={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          ess={{
            opacity: disabled ? 0.5 : 1,
            position: 'relative',
            fontSize: 12,
            lineHeight: 0,
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
    </Button>
  )
}

export default VariationSelector
