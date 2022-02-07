import React from 'react'
import { Box, Divider, Themed } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'

const Endnote = ({ label, children, divider }) => {
  return (
    <>
      {divider && (
        <Divider
          sx={{ mt: [6, 6, 7, 7], '@media print': { display: 'none' } }}
        />
      )}
      <section>
        <Row columns={[6]}>
          <Column start={[1]} width={[6]}>
            <Themed.h2>{label}</Themed.h2>
          </Column>
        </Row>
        <Row columns={[6]}>
          <Column start={[2]} width={[5]}>
            <Themed.p as='span'>{children}</Themed.p>
          </Column>
        </Row>
      </section>
    </>
  )
}

export default Endnote
