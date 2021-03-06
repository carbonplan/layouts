import React from 'react'
import { Divider } from 'theme-ui'

const SidebarDivider = ({ sx }) => {
  return (
    <Divider
      sx={{
        ...sx,
        width: [
          'calc(100% + 64px)',
          'calc(100% + 64px)',
          'calc(100% + 64px)',
          'calc(100% + 98px)',
        ],
        ml: ['-32px', '-32px', '-32px', '-48px'],
      }}
    />
  )
}

export default SidebarDivider
