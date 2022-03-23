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

export const ReferencesProvider = ({ references, color, children }) => {
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

  return (
    <References.Provider value={{ references, color, numbers, getNumber }}>
      {children}
    </References.Provider>
  )
}
