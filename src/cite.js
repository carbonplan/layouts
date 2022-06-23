import React from 'react'
import { Box } from 'theme-ui'
import { useReference, useReferences } from './references'
import InlineNote from './inline-note'

const sx = {
  mobile: {
    display: ['initial', 'initial', 'none', 'none'],
    '@media print': {
      display: 'none',
    },
  },
  desktop: {
    display: ['none', 'none', 'initial', 'initial'],
    '@media print': {
      display: 'initial',
    },
  },
}

const CiteInner = ({ id, data, first, ...props }) => {
  const { reference, number, color, side, mode } = useReference(id, first)
  const { url, note, authors, year, title, journal, editors } =
    reference || data

  return (
    <InlineNote
      number={number}
      url={url}
      color={color}
      side={side}
      mode={mode}
      {...props}
    >
      {note}
      {authors} {year ? `(${year})` : ''} {title} <i>{journal}</i>{' '}
      {editors ? `edited by ${editors}` : ''}
    </InlineNote>
  )
}

const CiteSeparator = ({ sep = ',', sx }) => {
  const { color } = useReferences()

  return (
    <Box as='span' sx={{ userSelect: 'none' }}>
      <Box
        as='span'
        sx={{
          fontSize: ['16px', '16px', '16px', '20px'],
          color: color,
          display: 'initial',
          ...sx,
        }}
      >
        <sup>{sep}</sup>
      </Box>
    </Box>
  )
}

const Cite = ({ id, ids, ...props }) => {
  if (!id && !ids) {
    throw Error('either id or ids must be specified')
  }

  if (id && ids) {
    throw Error('cannot specify both id and ids')
  }

  if (id) {
    return <CiteInner id={id} {...props} />
  }

  const count = ids.length

  if (count === 0) {
    throw Error('array of ids is empty')
  } else if (count === 1) {
    return <CiteInner id={ids[0]} {...props} />
  }

  let hide
  if (Array.isArray(props.hide) && props.hide.length !== count) {
    throw Error('length of hide must match length of ids')
  } else if (Array.isArray(props.hide)) {
    hide = props.hide
  } else {
    hide = new Array(count).fill(props.hide)
  }

  if (count === 2) {
    return (
      <>
        <CiteInner id={ids[0]} {...props} hide={hide[0]} />
        <CiteSeparator sep=',' />
        <CiteInner id={ids[1]} first={ids[0]} {...props} hide={hide[1]} />
      </>
    )
  } else if (count === 3) {
    return (
      <>
        <CiteInner id={ids[0]} {...props} hide={hide[0]} />
        <CiteSeparator sep=',' />
        <CiteInner id={ids[1]} first={ids[0]} {...props} hide={hide[1]} />
        <CiteSeparator sep=',' />
        <CiteInner id={ids[2]} first={ids[0]} {...props} hide={hide[2]} />
      </>
    )
  } else {
    return (
      <>
        <CiteInner id={ids[0]} {...props} hide={hide[0]} />
        {ids.slice(1, count - 1).map((d, i) => (
          <Box as='span' key={d}>
            <CiteSeparator sep=',' sx={sx.mobile} />
            <CiteInner
              id={d}
              sxLabel={sx.mobile}
              first={ids[0]}
              {...props}
              hide={hide[i + 1]}
            />
          </Box>
        ))}
        <CiteSeparator sep=',' sx={sx.mobile} />
        <CiteSeparator sep='-' sx={sx.desktop} />
        <CiteInner
          id={ids[count - 1]}
          first={ids[0]}
          {...props}
          hide={hide[count - 1]}
        />
      </>
    )
  }
}

export default Cite
