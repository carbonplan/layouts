import React from 'react'
import { useNote } from './references'
import InlineNote from './inline-note'

const Note = ({ children, sxReference, sxLabel, ...props }) => {
  const { number, color } = useNote(children)

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
