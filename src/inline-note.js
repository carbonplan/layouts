import React from 'react'
import { Box, Divider } from 'theme-ui'
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
  side = 'right',
  mode,
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

  const colOffset = mode === 'dual' ? 0 : 1

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
          float: ['none', 'none', side, side],
          clear: ['none', 'none', side, side],
          [side === 'right' ? 'mr' : 'ml']: [
            0,
            'calc(1 * 100vw / 8)',
            `calc(${'-1'} * (${
              colOffset + 2
            } * (100vw - 32px * 13) / 12 + 32px * ${colOffset + 2}))`,
            `calc(${'-1'} * (${
              colOffset + 2
            } * (100vw - 48px * 13) / 12 + 48px * ${colOffset + 2}))`,
          ],
          ...(side === 'right' ? { ml: [0, 'calc(1 * 100vw / 8)', 0, 0] } : {}),
          width: [
            'calc(4 * 100vw / 6 - 30px)',
            'calc(4 * 100vw / 8 - 42px)',
            'calc(2 * (100vw - 32px * 13) / 12 + 32px)',
            'calc(2 * (100vw - 48px * 13) / 12 + 48px)',
          ],

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
        <Box
          as='span'
          onMouseOver={toggleOn}
          onMouseOut={toggleOff}
          sx={{ width: '100%' }}
        >
          <Box
            as='span'
            sx={{
              fontFamily: 'body',
              width: '100%',
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
              sx={
                mode === 'dual'
                  ? {
                      width: '100%',
                      position: 'relative',
                      textAlign: 'left',
                      lineHeight: 1.25,
                      letterSpacing: '0.0125em',
                      display: ['none', 'none', 'block'],
                    }
                  : {
                      position: 'relative',
                      right: ['100%'],
                      mr: ['10px'],
                      mt: ['-50px'],
                      textAlign: 'right',
                      lineHeight: 1.25,
                      letterSpacing: '0.0125em',
                      display: ['none', 'none', 'initial'],
                    }
              }
            >
              {number}
            </Box>
            {mode === 'dual' && (
              <Box
                as='span'
                sx={{
                  my: [0, 0, 2, 2],
                  borderColor: color,
                  borderWidth: 0,
                  borderBottom: '1px solid',
                  width: [0, '32px', '32px', '48px'],
                  display: ['none', 'block', 'block', 'block'],
                }}
              />
            )}

            <Box
              as='span'
              sx={{
                mt: mode === 'dual' ? 0 : [0, 0, '-16px', '-18px'],
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
