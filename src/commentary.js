import React from 'react'
import { Box, Text, Container, Divider, Themed } from 'theme-ui'
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
    headingBorder: {
      pt: 3,
      mb: [0, 2, 3, 4],
      borderStyle: 'solid',
      borderWidth: 0,
      borderTopWidth: [0, '1px'],
      borderImage: (theme) =>
        `linear-gradient(to right, ${theme.colors[color]}  15%, transparent 15%) 100% 0`,
    },
    heading: {
      fontFamily: 'mono',
      letterSpacing: 'mono',
      textTransform: 'uppercase',
      color,
      fontSize: [1, 1, 2, 3],
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
      card={`${prefix}/social/${meta.card}.png`}
      description={meta.quickLook + '.'}
      title={meta.title + ' – CarbonPlan'}
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
          pt: [0, 5, '100px'],
        }}
      >
        <Row>
          {meta.links && (
            <Column
              start={[1, 2, 4, 4]}
              width={[6, 6, 6, 6]}
              sx={{ order: [4, 1, 1, 1] }}
            >
              <LinkGroup color='secondary' members={meta.links} />
            </Column>
          )}

          <Column
            start={[1, 1, 2, 2]}
            width={[2]}
            dr={1}
            sx={{
              mb: [-3, '-120px', 0, 0],
              mt: ['20px', '94px', '109px', '122px'],
              order: [1, 2, 2, 2],
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
            <Themed.h1>{displayTitle || meta.title}</Themed.h1>
          </Column>

          <Column
            start={[3, 1, 1, 1]}
            width={[4, 8, 12, 12]}
            sx={{ order: [2, 4, 4, 4] }}
          >
            <Row columns={[4, 8, 12, 12]}>
              <Column
                start={[1, 1, 2, 2]}
                width={[2, 1, 2, 2]}
                sx={{ ...sx.headingBorder, order: [1] }}
              >
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
                width={[6, 5, 6, 6]}
                sx={{ ...sx.headingBorder, order: [3, 2] }}
              >
                <Box sx={{ lineHeight: [1.15, 1.15, 1.35, 1.35] }}>
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
                sx={{ ...sx.headingBorder, order: [2, 3] }}
              >
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
