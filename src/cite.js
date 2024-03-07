import React, { useMemo } from 'react'
import { Box } from 'theme-ui'
import { useReference, useReferenceGroup, useReferences } from './references'
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

const CiteInner = ({
  reference,
  number,
  color,
  side,
  mode,
  data = {},
  ...props
}) => {
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

const SingleCite = ({ id, data, first, ...props }) => {
  const fullReference = useReference(id, first)

  return <CiteInner {...fullReference} {...props} data={data} />
}

const CiteGroup = ({ ids, hide = [], ...props }) => {
  const references = useReferenceGroup(ids)
  const groups = useMemo(() => {
    return references.reduce((accum, reference) => {
      let currentGroup = accum[accum.length - 1]
      if (!currentGroup) {
        currentGroup = { group: [reference], start: 0 }
        accum.push(currentGroup)
      } else if (
        currentGroup.group[currentGroup.group.length - 1].number + 1 ===
        reference.number
      ) {
        currentGroup.group.push(reference)
      } else {
        currentGroup = {
          group: [reference],
          start: currentGroup.start + currentGroup.group.length,
        }
        accum.push(currentGroup)
      }

      return accum
    }, [])
  }, [references])

  return groups.map(({ group, start }, i) => {
    return (
      <>
        {i > 0 && <CiteSeparator sep=',' />}

        {group.length === 1 && <CiteInner {...group[0]} hide={hide[start]} />}

        {group.length === 2 && (
          <>
            <CiteInner {...group[0]} hide={hide[start]} />
            <CiteSeparator sep=',' />
            <CiteInner {...group[1]} hide={hide[start + 1]} />
          </>
        )}

        {group.length > 2 && (
          <>
            <CiteInner {...group[0]} hide={hide[start]} />
            {group.slice(1, group.length - 1).map((fullReference, j) => (
              <Box as='span' key={ids[start + j + 1]}>
                <CiteSeparator sep=',' sx={sx.mobile} />
                <CiteInner
                  {...fullReference}
                  sxLabel={sx.mobile}
                  {...props}
                  hide={hide[start + j + 1]}
                />
              </Box>
            ))}

            <CiteSeparator sep=',' sx={sx.mobile} />
            <CiteSeparator sep='-' sx={sx.desktop} />
            <CiteInner
              {...group[group.length - 1]}
              hide={hide[start + group.length]}
            />
          </>
        )}
      </>
    )
  })
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

  console.log(ids)
  if (count === 2) {
    return (
      <>
        <SingleCite id={ids[0]} {...props} hide={hide[0]} />
        <CiteSeparator sep=',' />
        <SingleCite id={ids[1]} first={ids[0]} {...props} hide={hide[1]} />
      </>
    )
  } else if (count === 3) {
    return (
      <>
        <SingleCite id={ids[0]} {...props} hide={hide[0]} />
        <CiteSeparator sep=',' />
        <SingleCite id={ids[1]} first={ids[0]} {...props} hide={hide[1]} />
        <CiteSeparator sep=',' />
        <SingleCite id={ids[2]} first={ids[0]} {...props} hide={hide[2]} />
      </>
    )
  } else {
    return <CiteGroup ids={ids} hide={hide} />
  }
}

export default Cite
