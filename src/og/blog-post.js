import React from 'react'
import { formatDate } from '@carbonplan/components'
import theme from '@carbonplan/theme'
import { getFonts } from './utils/get-og-fonts'

const FONTS = [
  { path: 'relative-medium-pro.woff', name: 'medium' },
  { path: 'relative-faux-book-pro.woff', name: 'faux' },
  { path: 'relative-mono-11-pitch-pro.woff', name: 'mono' },
]

const AUTHOR_COLORS = ['red', 'orange', 'yellow', 'pink']

export const BlogPostOG = ({
  title,
  date,
  authors,
  number,
  collapseCardAuthors,
  titleWidthOverride,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '630px',
        paddingLeft: '78px',
        paddingRight: '78px',
        paddingTop: '55px',
        paddingBottom: '62px',
        backgroundColor: theme.colors.background,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        id='left'
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          id='upper'
        >
          <div
            style={{
              color: theme.colors.secondary,
              fontFamily: 'faux',
              fontSize: '34px',
              letterSpacing: '0.07em',
              marginTop: '2px',
            }}
          >
            blog / carbonplan
          </div>
          <h1
            style={{
              width: titleWidthOverride ? `${titleWidthOverride}px` : '800px',
              maxWidth: '894px', // prevent crashing into logo
              fontSize: '64px',
              marginTop: '44px',
              color: theme.colors.primary,
              fontFamily: 'medium',
              letterSpacing: '-0.015em',
              lineHeight: '1.05',
            }}
          >
            {title}
          </h1>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: collapseCardAuthors ? 'row' : 'column',
            flexWrap: 'wrap',
            fontFamily: 'mono',
            textTransform: 'uppercase',
            fontSize: '34px',
            marginBottom: '-6px',
            lineHeight: '1.35',
            letterSpacing: '0.07em',
            maxWidth: '894px',
          }}
        >
          {authors.map((author, i) => {
            const isFirstLineItem =
              collapseCardAuthors && authors.length === 3 && i === 0
            return (
              <div
                key={author}
                style={{
                  display: 'flex',
                  color: theme.colors[AUTHOR_COLORS[(number + i) % 4]],
                  width: isFirstLineItem ? '100%' : 'auto',
                }}
              >
                {author}
                {i < authors.length - 1 && (
                  <span
                    style={{
                      color: theme.colors.primary,
                      marginLeft: '16px',
                      marginRight: '16px',
                    }}
                  >
                    +
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div
        style={{
          width: '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '100%',
          flexShrink: 0,
        }}
        id='right'
      >
        <svg
          stroke='none'
          fill={theme.colors.primary}
          viewBox='0 0 32 32'
          width='160'
          height='160'
          style={{ marginTop: '-10px', marginRight: '-10px' }}
        >
          <path d='M21.9395,14.9395 L17.5005,19.3785 L17.5005,7.0005 L14.5005,7.0005 L14.5005,19.3785 L10.0605,14.9395 L7.9395,17.0605 L14.9395,24.0605 C15.2325,24.3535 15.6165,24.5005 16.0005,24.5005 C16.3835,24.5005 16.7675,24.3535 17.0605,24.0605 L24.0605,17.0605 L21.9395,14.9395 Z'></path>
          <path d='M27.5986,4 L22.8966,4 C26.5556,6.303 28.9996,10.366 28.9996,15 C28.9996,20.4 25.6896,25.039 20.9926,27 L26.5586,27 C29.8886,24.068 31.9996,19.785 31.9996,15 C31.9996,10.734 30.3196,6.868 27.5986,4'></path>
          <path d='M3,15 C3,10.366 5.444,6.303 9.104,4 L4.401,4 C1.68,6.868 0,10.734 0,15 C0,19.785 2.112,24.068 5.441,27 L11.008,27 C6.311,25.039 3,20.4 3,15'></path>
        </svg>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontFamily: 'mono',
            textTransform: 'uppercase',
            color: theme.colors.secondary,
            fontSize: '34px',
            letterSpacing: '0.07em',
            transform: 'rotate(90deg)',
            transformOrigin: 'right',
            marginRight: '10px',
            marginBottom: '-18px',
            width: '250px',
          }}
        >
          {formatDate(date, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>
    </div>
  )
}

export const getBlogPostCard = async ({
  title,
  date,
  authors,
  collapseCardAuthors,
  number,
  titleWidthOverride,
}) => {
  const fonts = await getFonts(FONTS)

  return {
    component: (
      <BlogPostOG
        title={title}
        date={date}
        authors={authors}
        collapseCardAuthors={collapseCardAuthors}
        number={number}
        titleWidthOverride={titleWidthOverride}
      />
    ),
    fonts,
    options: {
      width: 1200,
      height: 630,
      debug: false,
    },
  }
}
