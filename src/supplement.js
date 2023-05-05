import React from 'react'
import { Box, Divider } from 'theme-ui'
import { Layout, Row, Column, Button, formatDate } from '@carbonplan/components'
import { Left } from '@carbonplan/icons'
import ReadMore from './read-more'

const prefix = 'https://images.carbonplan.org'

const Supplement = ({ back = '/research', children, meta, ...props }) => {
  return (
    <Layout
      card={`${prefix}/social/${meta.card}.png`}
      url={meta.path ? `https://carbonplan.org${meta.path}` : null}
      description={meta.quickLook + '.'}
      title={meta.title + ' – CarbonPlan'}
      links={'local'}
      metadata={'scroll'}
      nav={'research'}
      printable={true}
      {...props}
    >
      <Row>
        <Column
          start={[1, 1]}
          width={[2]}
          dr={1}
          sx={{ mb: [-2, -4, 0, 0], mt: [3, 4, '109px', '154px'] }}
        >
          <Button
            onClick={() => {
              if (window.history.state?.idx) {
                window.history.back()
              } else {
                window.location.href = back
              }
            }}
            inverted
            size='xs'
            prefix={<Left />}
            sx={{ ml: ['-2px', '-2px', '-2px', '-2px'] }}
          >
            Back
          </Button>
        </Column>
        <Column
          start={[5, 7, 7, 7]}
          width={[2]}
          sx={{
            mb: [-3, '-120px', 0, 0],
            mt: [3, '91px', '106px', '119px'],
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
            fontSize: [1, 1, 1, 2],
            textAlign: 'right',
            display: ['initial', 'initial', 'none', 'none'],
          }}
        >
          {formatDate(meta.date)}
        </Column>
        <Column start={[1, 2, 3, 3]} width={[6, 6, 6, 6]}>
          <Box as='article'>{children}</Box>
          <Divider sx={{ mt: [6, 6, 7, 7] }} />
          <ReadMore target='research' />
        </Column>
        <Column
          start={[1, 1, 10, 10]}
          width={[6, 6, 2, 2]}
          sx={{
            mb: [-3, '-120px', 0, 0],
            mt: [3, '91px', '106px', '119px'],
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
            fontSize: [1, 1, 1, 2],
            display: ['none', 'none', 'initial', 'intiial'],
          }}
        >
          {formatDate(meta.date)}
        </Column>
      </Row>
    </Layout>
  )
}

export default Supplement
