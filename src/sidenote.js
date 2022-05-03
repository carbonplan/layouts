import React from 'react'
import { useSidenote } from './references'
import InlineNote from './inline-note'

const Sidenote = ({ children, url, ...props }) => {
  const { number, color } = useSidenote(children, url)

  return (
    <InlineNote
      number={number}
      color={color}
      url={url}
      sxReference={{
        '& a': { color: 'inherit', '&:hover': { color: 'inherit' } },
      }}
      {...props}
    >
      {children}
    </InlineNote>
  )
}

export default Sidenote
