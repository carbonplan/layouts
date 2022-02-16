import React from 'react'
import { Box } from 'theme-ui'

const SidebarAttachment = ({ children, expanded, side, width, sx }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        transition: `${side} 0.2s`,
        [side]: expanded
          ? [
              `calc(${width} * 100vw / 6 - 12px)`,
              `calc(${width} * 100vw / 8 - 18px)`,
              `calc(${width} * 100vw / 12 + 37px)`,
              `calc(${width} * 100vw / 12 + 54px)`,
            ]
          : '12px',
        zIndex: 1001,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default SidebarAttachment
