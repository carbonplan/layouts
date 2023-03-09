import React, { useCallback } from 'react'
import { Box, Flex } from 'theme-ui'
import { Button, Row, Column } from '@carbonplan/components'
import { ArrowThin } from '@carbonplan/icons'

import SidebarAttachment from './sidebar-attachment'

const Sidebar = ({
  children,
  tooltip,
  onClose,
  footer,
  expanded,
  setExpanded,
  side = 'left',
  width = 3,
}) => {
  const handleToggleExpanded = useCallback(() => {
    if (!expanded) {
      setExpanded(true)
    } else {
      if (onClose) {
        onClose()
      }
      setExpanded(false)
    }
  }, [expanded, onClose])

  const icon = (
    <Box
      sx={{
        p: 1,
        mr:
          side === 'left'
            ? ['29px', '29px', '29px', '24px']
            : ['22px', '22px', '22px', '17px'],
        pl: side === 'right' ? '7px' : null,
      }}
    >
      <ArrowThin
        id='arrow'
        sx={{
          strokeWidth: 2,
          width: 24,
          height: 24,
          transition: 'transform 0.2s',
          transform:
            (expanded && side === 'left') || (!expanded && side === 'right')
              ? 'scaleX(-1)'
              : '',
          mb: ['-6px', '-6px', '-6px', '-4px'],
        }}
      />
    </Box>
  )

  return (
    <>
      {setExpanded && (
        <SidebarAttachment
          width={width}
          side={side}
          expanded={expanded}
          sx={{ bottom: ['18px', '18px', '18px', '16px'] }}
        >
          <Button
            onClick={handleToggleExpanded}
            prefix={side === 'left' ? icon : null}
            suffix={side === 'right' ? icon : null}
            size='sm'
            sx={{
              display: ['none', 'none', 'inline-block', 'inline-block'],
              cursor: 'pointer',
              color: 'primary',
            }}
          >
            {expanded ? null : tooltip}
          </Button>
        </SidebarAttachment>
      )}
      <Row>
        <Column width={width} start={1}>
          <Box
            sx={{
              position: 'absolute',
              [side]: '0px',
              [side === 'left' ? 'right' : 'left']: [
                `calc(${6 - width} * (100vw - 7 * 24px) / 6 + ${
                  12 - width
                } * 24px)`,
                `calc(${8 - width} * (100vw - 9 * 32px) / 8 + ${
                  12 - width
                } * 32px)`,
                `calc(${12 - width} * (100vw - 13 * 32px) / 12 + ${
                  12 - width
                } * 32px)`,
                `calc(${12 - width} * (100vw - 13 * 48px) / 12 + ${
                  12 - width
                } * 48px)`,
              ],
              zIndex: 1000,
              transition: 'transform 0.2s',
              transform: expanded
                ? 'translateX(0)'
                : `translateX(${side === 'left' ? '-' : ''}100%)`,
            }}
          >
            <Box
              sx={{
                px: [4, 5, 5, 6],
                height: '56px',
                bg: 'background',
                [side === 'left' ? 'borderRight' : 'borderLeft']: ({
                  colors,
                }) => `${expanded ? 1 : 0}px solid ${colors.muted}`,
                borderBottom: ({ colors }) =>
                  `${expanded ? 1 : 0}px solid ${colors.muted}`,
                transition: 'border 0.2s',
              }}
            />
            <Box
              sx={{
                px: [4, 5, 5, 6],
                pointerEvents: 'all',
                bg: 'background',
                overflow: 'hidden',
                maxHeight: 'calc(100vh - 56px)',
                minHeight: 'calc(100vh - 56px)',
                transition: 'border 0.2s',
                [side === 'left' ? 'borderRight' : 'borderLeft']: ({
                  colors,
                }) => `${expanded ? 1 : 0}px solid ${colors.muted}`,
              }}
            >
              <Box
                sx={{
                  transition: 'opacity 0.2s',
                  opacity: expanded ? 1 : 0,
                }}
              >
                {expanded && (
                  <Flex
                    sx={{
                      flexDirection: 'column',
                      height: 'calc(100vh - 56px)',
                      mx: [-4, -5, -5, -6],
                    }}
                  >
                    <Box
                      sx={{
                        flex: '1 1 auto',
                        overflow: 'hidden',
                        bg: 'transparent',
                        px: [4, 5, 5, 6],
                      }}
                    >
                      <Row
                        columns={width}
                        sx={{
                          flex: '0 0 auto',
                          height: '100%',
                          overflowX: 'hidden',
                          overflowY: 'scroll',
                          py: [4],
                          px: [4, 5, 5, 6],
                          mx: [-4, -5, -5, -6],
                        }}
                      >
                        <Column width={4} start={1}>
                          {children}
                        </Column>
                      </Row>
                    </Box>
                    {footer && (
                      <Box sx={{ flex: '0 0 auto', px: [4, 5, 5, 6] }}>
                        {footer}
                      </Box>
                    )}
                  </Flex>
                )}
              </Box>
            </Box>
          </Box>
        </Column>
      </Row>
    </>
  )
}

export default Sidebar
