import React, { createContext, useCallback, useContext, useRef } from 'react'

const References = createContext(null)

export const useReferences = () => {
  return useContext(References)
}

export const useReference = (id) => {
  const { references, color, getNumber } = useContext(References)
  const reference = references[id]
  if (!reference) {
    throw Error(`referencee ${id} not found`)
  }

  return { reference, number: getNumber(id), color }
}

export const useNote = (customNote, url) => {
  const { color, registerNote } = useContext(References)
  const noteID = useRef()

  const { number, id } = registerNote(noteID.current, customNote, url)
  noteID.current = id

  return { color, number }
}

export const ReferencesProvider = ({
  references: referencesProp,
  color,
  children,
}) => {
  const { current: references } = useRef({ ...referencesProp })
  const { current: numbers } = useRef({})

  const getNumber = useCallback(
    (id) => {
      if (!numbers[id]) {
        numbers[id] = Object.keys(numbers).length + 1
      }
      return numbers[id]
    },
    [numbers]
  )

  const registerNote = useCallback(
    (id, note, url) => {
      let noteID = id
      if (!noteID) {
        const number = Object.keys(numbers).length + 1
        noteID = `note-${number}`
      }
      references[noteID] = { customNote: note, url }
      return { id: noteID, number: getNumber(noteID) }
    },
    [numbers]
  )

  return (
    <References.Provider
      value={{ references, color, numbers, getNumber, registerNote }}
    >
      {children}
    </References.Provider>
  )
}
