import { Group } from '@carbonplan/components'
import React from 'react'
import { Box } from 'theme-ui'

import Endnote from './endnote'
import { useReference, useReferences } from './references'

const Reference = ({ number, id }) => {
  const { reference } = useReference(id)
  const { customNote, url, note, authors, year, title, journal, editors } =
    reference

  return (
    <Box as={url ? 'a' : 'div'} href={url} sx={{ color: 'primary' }}>
      <Box>
        <Box as='span' sx={{ mr: 3 }}>
          {number}
        </Box>
        <Box as='span'>
          {customNote ?? (
            <>
              {note}
              {authors} {year ? `(${year})` : ''} {title} <i>{journal}</i>{' '}
              {editors ? `edited by ${editors}` : ''}
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
export const Footnotes = () => {
  const { numbers } = useReferences()

  if (Object.keys(numbers).length === 0) {
    return null
  }

  return (
    <Box sx={{ display: 'none', '@media print': { display: 'block' } }}>
      <Endnote label='Footnotes'>
        <Box variant='styles.p'>
          <Group spacing={4}>
            {Object.keys(numbers)
              .sort((a, b) => numbers[a] - numbers[b])
              .map((id) => (
                <Reference key={id} number={numbers[id]} id={id} />
              ))}
          </Group>
        </Box>
      </Endnote>
    </Box>
  )
}

export default Footnotes
