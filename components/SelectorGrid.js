import React from 'react'
import { Grid } from '@64labs/ui'

const SelectorGrid = ({ children }) => (
  <Grid
    ess={{
      flex: '1 1 0',
      gridTemplateColumns: ['auto', 'repeat(auto-fill, minmax(40px, 1fr))'],
      gridColumnGap: '5px',
      gridRowGap: '10px'
    }}
  >
    {children}
  </Grid>
)

export default SelectorGrid
