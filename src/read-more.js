import React from 'react'
import { Box } from 'theme-ui'
import { Row, Column, Callout } from '@carbonplan/components'

const ReadMore = ({ children, target = 'research' }) => {
  return (
    <Row
      as='section'
      columns={[6]}
      sx={{ mt: [6, 6, 7, 8], '@media print': { display: 'none' } }}
    >
      <Column start={[1]} width={[3, 3, 3, 3]}>
        <Callout href='mailto:hello@carbonplan.org' label={'email us'}>
          Questions? Interested in collaborating on these problems?
        </Callout>
      </Column>
      <Column start={[4, 5, 5, 5]} width={[3, 2, 2, 2]}>
        <Callout href={`/${target}`} label={target}>
          Want to read more from our team?
        </Callout>
      </Column>
    </Row>
  )
}

export default ReadMore
