import React from 'react'
import { Box } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import SidebarDivider from './sidebar-divider'

const SidebarFooter = ({ children, sx, ...props }) => {
  return (
    <>
      <SidebarDivider sx={{ my: [0] }} />

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

export default SidebarFooter
