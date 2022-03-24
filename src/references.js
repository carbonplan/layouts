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

export const useReferenceNote = (customNote) => {
  const { color, numbers, getNumber } = useContext(References)
  const { current: noteID } = useRef(Object.keys(numbers).length + 1)
  const number = getNumber(noteID, { customNote })

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
    (id, data) => {
      if (!numbers[id]) {
        numbers[id] = Object.keys(numbers).length + 1
        if (data) {
          references[id] = data
        }
      }
      return numbers[id]
    },
    [numbers]
  )

  return (
    <References.Provider value={{ references, color, numbers, getNumber }}>
      {children}
    </References.Provider>
  )
}
