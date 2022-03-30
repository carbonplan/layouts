import React from 'react'
import { Box } from 'theme-ui'
import { useState } from 'react'

const Wrapper = ({ url, children, sx }) => {
  if (url) {
    return (
      <Box as='a' href={url} sx={sx}>
        {children}
      </Box>
    )
  } else {
    return (
      <Box as='span' sx={sx}>
        {children}
      </Box>
    )
  }
}

const InlineNote = ({
  number,
  url,
  color,
  children,
  hide = false,
  sx,
  sxReference,
  sxLabel,
}) => {
  const [selected, setSelected] = useState(false)
  const [selectedMobile, setSelectedMobile] = useState(false)

  const toggleOn = () => {
    setSelected(true)
  }

  const toggleOff = () => {
    setSelected(false)
  }

  const toggle = () => {
    setSelectedMobile(!selectedMobile)
  }

  return (
    <Box as='span' sx={{ userSelect: 'none', ...sx }}>
      <Box
        as='span'
        onMouseOver={toggleOn}
        onMouseOut={toggleOff}
        onClick={toggle}
        sx={{
          fontSize: ['16px', '16px', '16px', '20px'],
          cursor: 'pointer',
          color: color,
          transition: 'color 0.2s ease-in-out',
          ...sxLabel,
        }}
      >
        <sup>{number}</sup>
      </Box>
      <Wrapper
        url={url}
        sx={{
          float: ['none', 'none', 'right', 'right'],
          clear: ['none', 'none', 'right', 'right'],
          mr: [
            0,
            0,
            'calc(-1 * (3 * (100vw - 32px * 13) / 12 + 32px * 3))',
            'calc(-1 * (3 * (100vw - 48px * 13) / 12 + 48px * 3))',
          ],
          width: [
            'calc(4 * 100vw / 6 - 30px)',
            'calc(4 * 100vw / 8 - 42px)',
            'calc(2 * (100vw - 32px * 13) / 12 + 32px)',
            'calc(2 * (100vw - 48px * 13) / 12 + 48px)',
          ],
          ml: [0, 'calc(1 * 100vw / 8)', 0, 0],
          mt: [3, 3, 0, 0],
          mb: [3, 3, 3, 4],
          verticalAlign: 'baseline',
          position: 'relative',
          display: hide
            ? 'none'
            : [
                selectedMobile ? 'block' : 'none',
                selectedMobile ? 'block' : 'none',
                'initial',
                'initial',
              ],
          ...sxReference,
        }}
      >
        <Box as='span' onMouseOver={toggleOn} onMouseOut={toggleOff}>
          <Box
            as='span'
            sx={{
              fontFamily: 'body',
              fontSize: [1, 1, '13px', '15px'],
              lineHeight: 1.25,
              letterSpacing: '0.0125em',
              color: color,
              opacity: [1, 1, selected ? 1 : 0.5],
              display: 'inline-block',
              transition: 'opacity 0.2s ease-in-out',
              textAlign: ['left', 'left', 'right', 'right'],
            }}
          >
            <Box
              as='span'
              sx={{
                position: 'relative',
                right: ['100%'],
                mr: ['10px'],
                mt: ['-50px'],
                textAlign: 'right',
                lineHeight: 1.25,
                letterSpacing: '0.0125em',
                display: ['none', 'none', 'initial'],
              }}
            >
              {number}
            </Box>
            <Box
              as='span'
              sx={{
                mt: [0, 0, '-16px', '-18px'],
                textAlign: 'left',
                display: ['initial', 'initial', 'block'],
                lineHeight: 1.25,
                letterSpacing: '0.0125em',
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </Box>
  )
}

export default InlineNote
