import React from 'react'
import { Box, Text, Divider } from 'theme-ui'
import {
  Layout,
  Row,
  Column,
  Button,
  LinkGroup,
  formatDate,
} from '@carbonplan/components'
import { Left } from '@carbonplan/icons'
import { PrintedFootnotes } from './printed-footnotes'
import { ReferencesProvider } from './references'
import ReadMore from './read-more'

const prefix = 'https://images.carbonplan.org'

const getSx = (color) => {
  return {
    divider: {
      mb: 3,
      borderColor: color,
      width: [0, '32px', '32px', '48px'],
      display: ['none', 'block', 'block', 'block'],
    },
    heading: {
      fontFamily: 'mono',
      letterSpacing: 'mono',
      textTransform: 'uppercase',
      color,
      fontSize: [1, 1, 2, 3],
      mb: [0, 2, 3, 4],
    },
  }
}
const Commentary = ({
  back = '/research',
  children,
  meta,
  references,
  displayTitle,
  ...props
}) => {
  const sx = getSx(meta.color)

  return (
    <Layout
      card={`${prefix}/social/commentary/${meta.card}.png`}
      description={meta.summary}
      title={meta.title + ' – CarbonPlan'}
      url={meta.path ? `https://carbonplan.org${meta.path}` : null}
      links={'local'}
      metadata={'scroll'}
      nav={'research'}
      printable={true}
      {...props}
    >
      <Box
        as='article'
        sx={{
          px: [0, 0, 0],
          mt: [4, 6, 7, 8],
        }}
      >
        <Row>
          {meta.links && (
            <Column
              start={[1, 2, 4, 4]}
              width={[6, 6, 6, 6]}
              sx={{
                order: [4, 2, 2, 2],
                mt: [0, 0, 0, '2px'],
                mb: ['16px', 0],
              }}
            >
              <LinkGroup color='secondary' members={meta.links} />
            </Column>
          )}

          <Column
            start={[1, 1, 2, 2]}
            width={[2, 1, 2, 2]}
            dr={1}
            sx={{
              mt: [0, 0, 0, '2px'],
              order: [1, 1, 1, 1],
            }}
          >
            <Button
              inverted
              size='xs'
              onClick={() => {
                if (window.history.state?.idx) {
                  window.history.back()
                } else {
                  window.location.href = back
                }
              }}
              prefix={<Left />}
              sx={{
                ml: ['-2px', '-2px', '-2px', '-2px'],
                '@media print': {
                  display: 'none',
                },
              }}
            >
              Back
            </Button>
          </Column>

          <Column
            start={[1, 2, 4, 4]}
            width={[6, 6, 6, 6]}
            sx={{ order: [3, 3, 3, 3] }}
          >
            <Box as='h1' variant='styles.h1'>
              {displayTitle || meta.title}
            </Box>
          </Column>

          <Column
            start={[3, 1, 1, 1]}
            width={[4, 8, 12, 12]}
            sx={{ order: [2, 4, 4, 4] }}
          >
            <Row columns={[4, 8, 12, 12]} sx={{ mt: ['-3px', 0] }}>
              <Column
                start={[1, 1, 2, 2]}
                width={[2, 1, 2, 2]}
                sx={{ order: [1] }}
              >
                <Divider sx={sx.divider} />

                <Box
                  sx={{
                    ...sx.heading,
                    mt: ['3px'],
                  }}
                >
                  <Box
                    as='span'
                    sx={{ display: ['none', 'initial', 'none', 'none'] }}
                  >
                    ({meta.number})
                  </Box>
                  <Box
                    as='span'
                    sx={{ display: ['initial', 'none', 'initial', 'initial'] }}
                  >
                    COMMENTARY({meta.number})
                  </Box>
                </Box>
              </Column>

              <Column
                start={[1, 2, 4, 4]}
                width={[4, 5, 6, 6]}
                sx={{ order: [3, 2] }}
              >
                <Divider
                  sx={{
                    ...sx.divider,
                    width: [
                      0,
                      'calc((100vw - 9 * 32px) / 8)',
                      'calc((100vw - 13 * 32px) / 12)',
                      'calc((100vw - 13 * 48px) / 12)',
                    ],
                  }}
                />

                <Box
                  sx={{
                    lineHeight: [1.15, 1.15, 1.35, 1.35],
                    mt: [3, 0, 0, 0],
                  }}
                >
                  <Text sx={sx.heading}>
                    by{' '}
                    {meta.authors.map((author, ix) => (
                      <Text
                        key={author}
                        sx={{ display: 'inline-block', mr: [2] }}
                      >
                        {author.replace(/ /g, '\u00a0')}{' '}
                        {ix < meta.authors.length - 1 ? '+' : ''}
                      </Text>
                    ))}
                  </Text>
                </Box>
              </Column>

              <Column
                start={[3, 7, 10, 10]}
                width={[2, 2, 2, 2]}
                sx={{ order: [2, 3] }}
              >
                <Divider sx={sx.divider} />

                <Text sx={sx.heading}>{formatDate(meta.date)}</Text>
              </Column>
            </Row>
          </Column>

          <Column start={[1, 2, 4, 4]} width={[6, 6, 6, 6]} sx={{ order: [5] }}>
            <ReferencesProvider
              color={meta.color}
              references={references}
              mode='dual'
            >
              {children}

              <PrintedFootnotes />
            </ReferencesProvider>

            <Divider
              sx={{ mt: [6, 6, 7, 7], '@media print': { display: 'none' } }}
            />
            <ReadMore target='research' />
          </Column>
        </Row>
      </Box>
    </Layout>
  )
}

export default Commentary
