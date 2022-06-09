import React, { createContext, useCallback, useContext, useRef } from 'react'

const References = createContext(null)

export const useReferences = () => {
  return useContext(References)
}

export const useReference = (id, first) => {
  const { references, color, getNumber, getSide, mode } = useContext(References)
  const reference = references[id]
  if (!reference) {
    throw Error(`referencee ${id} not found`)
  }

  const number = getNumber(id)

  return {
    reference,
    number,
    color,
    side: getSide(id, first),
    mode,
  }
}

export const useSidenote = (sidenote, url) => {
  const { color, mode, getSide, registerSidenote } = useContext(References)
  const noteID = useRef()

  const { number, id } = registerSidenote(noteID.current, sidenote, url)
  noteID.current = id

  return { color, mode, number, side: getSide(number) }
}

export const ReferencesProvider = ({
  references: referencesProp,
  color,
  mode = 'right',
  children,
}) => {
  const { current: references } = useRef({ ...referencesProp })
  const { current: numbers } = useRef({})
  const { current: sides } = useRef({})

  if (!['right', 'dual'].includes(mode)) {
    throw Error(
      `Unexpected mode: ${mode} provided. Must be one of 'right', 'dual'`
    )
  }

  const getNumber = useCallback(
    (id) => {
      if (!numbers[id]) {
        numbers[id] = Object.keys(numbers).length + 1
      }
      return numbers[id]
    },
    [numbers]
  )

  const getSide = useCallback(
    (id, first) => {
      if (mode === 'right') {
        return 'right'
      }

      if (sides[first]) {
        return sides[first]
      }

      if (!sides[id]) {
        const side = Object.keys(sides).length % 2 === 0 ? 'left' : 'right'
        sides[id] = side
      }

      return sides[id]
    },
    [sides, mode]
  )

  const registerSidenote = useCallback(
    (id, sidenote, url) => {
      let noteID = id
      if (!noteID) {
        const number = Object.keys(numbers).length + 1
        noteID = `note-${number}`
      }
      references[noteID] = { sidenote, url }
      return { id: noteID, number: getNumber(noteID) }
    },
    [numbers]
  )

  return (
    <References.Provider
      value={{
        references,
        color,
        mode,
        numbers,
        getNumber,
        getSide,
        registerSidenote,
      }}
    >
      {children}
    </References.Provider>
  )
}
