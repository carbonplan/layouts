import React from 'react'
import { Box } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import SidePanelDivider from './side-panel-divider'

const SidePanelFooter = ({ children, sx, ...props }) => {
  return (
    <>
      <SidePanelDivider sx={{ my: [0] }} />

      <Box
        sx={{
          mx: [-4, -5, -5, -6],
          px: [4, 5, 5, 6],
          py: [4],
          cursor: 'pointer',
          transition: 'background-color 0.15s',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover': { bg: alpha('muted', 0.25) },
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    </>
  )
}

export default SidePanelFooter
