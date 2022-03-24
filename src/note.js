import React from 'react'
import { useReferenceNote } from './references'
import InlineNote from './inline-note'

const Note = ({ children, sxReference, sxLabel, ...props }) => {
  const { number, color } = useReferenceNote(children)

  return (
    <InlineNote
      number={number}
      sxNote={sxReference}
      sxLabel={sxLabel}
      color={color}
      {...props}
    >
      {children}
    </InlineNote>
  )
}

export default Note
