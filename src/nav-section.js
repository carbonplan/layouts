import React from 'react'
import { useState } from 'react'
import { Layout, Row, Column, FadeIn } from '@carbonplan/components'
import NavMenu from './nav-menu'

const NavSection = ({
  children,
  name,
  title,
  description,
  menu = {},
  ...props
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Layout
      fade={false}
      settings={{
        value: expanded,
        onClick: () => setExpanded((prev) => !prev),
      }}
      title={title}
      description={description}
      {...props}
    >
      <Row>
        <Column start={[1, 1, 2, 2]} width={[4, 4, 2, 2]}>
          <NavMenu active={name} expanded={expanded} {...menu} />
        </Column>
        <Column start={[1, 2, 5, 5]} width={[6]} sx={{ mb: [8, 8, 9, 10] }}>
          <FadeIn>{children}</FadeIn>
        </Column>
      </Row>
    </Layout>
  )
}

export default NavSection
