import React from 'react'
import { Box, Divider } from 'theme-ui'
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
            <Box as='h2' variant='styles.h2'>
              {label}
            </Box>
          </Column>
        </Row>
        <Row columns={[6]}>
          <Column start={[2]} width={[5]}>
            <Box as='span' variant='styles.p'>
              {children}
            </Box>
          </Column>
        </Row>
      </section>
    </>
  )
}

export default Endnote
