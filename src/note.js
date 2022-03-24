import React from 'react'
import { useNote } from './references'
import InlineNote from './inline-note'

const Note = ({ children, url, sxReference, sxLabel, ...props }) => {
  const { number, color } = useNote(children, url)

  return (
    <InlineNote
      number={number}
      sxNote={sxReference}
      sxLabel={sxLabel}
      color={color}
      url={url}
      {...props}
    >
      {children}
    </InlineNote>
  )
}

export default Note
