import React from 'react'
import { Box } from 'theme-ui'

const FigureCaption = ({ number, children }) => {
  return (
    <Box
      as='figcaption'
      sx={{
        color: 'secondary',
        mt: [3, 3, 3, 4],
        mb: [6, 6, 6, 7],
        fontSize: [2, 2, 2, 3],
      }}
    >
      {number && (
        <>
          <Box sx={{ letterSpacing: 'smallcaps', display: 'inline-block' }}>
            FIGURE {number}
          </Box>{' '}
          <Box sx={{ display: 'inline-block', mx: [1], pr: [1] }}>/</Box>
        </>
      )}
      {children}
    </Box>
  )
}

export default FigureCaption
