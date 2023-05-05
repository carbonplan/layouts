import React from 'react'
import { Box, Text, Divider } from 'theme-ui'
import {
  Button,
  Column,
  Row,
  Layout,
  AvatarGroup,
  formatDate,
} from '@carbonplan/components'
import { Left } from '@carbonplan/icons'
import ReadMore from './read-more'

const prefix = 'https://images.carbonplan.org'

const Authors = ({ authors }) => {
  return (
    <>
      <Text
        sx={{
          color: 'secondary',
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          fontSize: [2, 2, 2, 3],
        }}
      >
        by
      </Text>
      <br />
      <Text
        sx={{
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          fontSize: [2, 2, 2, 3],
        }}
      >
        {authors.map(({ id }, ix) => (
          <Text
            key={id}
            sx={{
              display: 'inline-block',
              mr: [2],
              fontFamily: 'mono',
              letterSpacing: 'mono',
              fontSize: [2, 2, 2, 3],
            }}
          >
            {id.replace(/ /g, '\u00a0')}
            {'\u00a0'}
            {ix < authors.length - 1 ? '+' : ''}
          </Text>
        ))}
      </Text>
    </>
  )
}

const Post = ({ back = '/blog', children, meta, number, ...props }) => {
  const colors = ['red', 'orange', 'yellow', 'pink']
  const avatars = meta.authors.map((d, i) => {
    const color = colors[(number + i) % 4]
    if (typeof d === 'string') {
      return { id: d, name: d, color }
    } else {
      const { src, name } = d
      return { id: name, src, color }
    }
  })

  return (
    <Layout
      card={
        meta.card
          ? `${prefix}/social/blog/${meta.card}.png`
          : 'https://images.carbonplan.org/social/blog.png'
      }
      url={meta.path ? `https://carbonplan.org${meta.path}` : null}
      description={meta.summary}
      title={meta.title + ' – CarbonPlan'}
      links={'local'}
      metadata={'scroll'}
      container={true}
      printable={true}
      {...props}
    >
      <Row sx={{ mt: [4, 6, 7, 8] }}>
        <Column start={[1, 2, 2, 2]} width={[2, 1, 2, 2]}>
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
              mt: [0, 0, 0, '2px'],
              '@media print': {
                display: 'none',
              },
            }}
          >
            Back
          </Button>
        </Column>
        <Column
          start={[4, 5, 5, 5]}
          width={[3, 3, 2, 2]}
          sx={{
            textAlign: ['right', 'right', 'left', 'left'],
            mt: ['-3px', '-3px', '-3px', '-1px'],
          }}
        >
          <Text
            sx={{
              fontFamily: 'mono',
              letterSpacing: 'mono',
              textTransform: 'uppercase',
              color: 'secondary',
              fontSize: [2, 2, 2, 3],
            }}
          >
            {formatDate(meta.date, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </Column>
      </Row>
      <Row>
        <Column start={[1, 2, 5, 5]} width={[6, 6, 6, 6]}>
          <Box as='h1' variant='styles.h1' sx={{ mb: [5, 5, 5, 5] }}>
            {meta.title}
          </Box>
        </Column>
      </Row>
      <Row>
        <Column start={[1, 2, 2, 2]} width={[6, 6, 2, 2]}>
          <Box sx={{ mt: [0, 0, '20px', '32px'] }}>
            <Row
              columns={[6, 6, 2, 2]}
              sx={{
                '@media print': {
                  mb: [5],
                },
              }}
            >
              <Column start={[1]} width={[3, 3, 2, 2]} sx={{ mb: [3] }}>
                <Authors authors={avatars} />
              </Column>
              <Column
                start={[4, 4, 1, 1]}
                width={[3, 3, 2, 2]}
                sx={{
                  pl: [meta.authors.length > 2 ? 4 : 0, 0, 0, 0],
                  mt: [-1, -1, 0, 0],
                  mb: [0, 4, 0, 0],
                }}
              >
                <AvatarGroup
                  members={avatars}
                  fixedCount={3}
                  spacing={[2, 2, 2, 3]}
                  maxWidth='125px'
                  align={['right', 'left', 'left', 'left']}
                  width={['100%', '100%', '100%', '100%']}
                />
              </Column>
            </Row>
          </Box>
        </Column>
        <Column start={[1, 2, 5, 5]} width={[6, 6, 6, 6]}>
          <Box as='article'>{children}</Box>
          <Divider
            sx={{ mt: [6, 6, 7, 7], '@media print': { display: 'none' } }}
          />
          <ReadMore target='blog' />
        </Column>
      </Row>
    </Layout>
  )
}

export default Post
