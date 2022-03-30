import React from 'react'
import { Box } from 'theme-ui'
import { useReference, useReferences } from './references'
import InlineNote from './inline-note'

const CiteInner = ({ id, data, ...props }) => {
  const { reference, number, color } = useReference(id)
  const { url, note, authors, year, title, journal, editors } =
    reference || data

  return (
    <InlineNote number={number} url={url} color={color} {...props}>
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
  } else if (count === 2) {
    return (
      <>
        <CiteInner id={ids[0]} {...props} />
        <CiteSeparator sep=',' />
        <CiteInner id={ids[1]} {...props} />
      </>
    )
  } else if (count === 3) {
    return (
      <>
        <CiteInner id={ids[0]} {...props} />
        <CiteSeparator sep=',' />
        <CiteInner id={ids[1]} {...props} />
        <CiteSeparator sep=',' />
        <CiteInner id={ids[2]} {...props} />
      </>
    )
  } else {
    return (
      <>
        <CiteInner id={ids[0]} {...props} />
        {ids.slice(1, count - 1).map((d, i) => (
          <Box as='span' key={d}>
            <CiteSeparator
              sep=','
              sx={{ display: ['initial', 'initial', 'none', 'none'] }}
            />
            <CiteInner
              id={d}
              sxLabel={{ display: ['initial', 'initial', 'none', 'none'] }}
              {...props}
            />
          </Box>
        ))}
        <CiteSeparator
          sep=','
          sx={{ display: ['initial', 'initial', 'none', 'none'] }}
        />
        <CiteSeparator
          sep='-'
          sx={{ display: ['none', 'none', 'initial', 'initial'] }}
        />
        <CiteInner id={ids[count - 1]} {...props} />
      </>
    )
  }
}

export default Cite
