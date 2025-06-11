'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'

import type { CardWidthContext, CardWidth } from './types'

const initialContext: CardWidthContext = {
  setCardWidth: () => null,
  cardWidth: undefined,
  containerWidth: undefined,
  setContainerWidth: () => null,
}

const CardWidthContext = createContext(initialContext)

export const CardWidthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardWidth, setCardWidthState] = useState<CardWidth | undefined>(undefined)
  const [containerWidth, setContainerWidth] = useState<CardWidth | undefined>(undefined)

  const setCardWidth = useCallback((cardSizeToSet: CardWidth | null) => {
    setCardWidthState(cardSizeToSet)
  }, [])
  return (
    <CardWidthContext.Provider
      value={{ setCardWidth, cardWidth, containerWidth, setContainerWidth }}
    >
      {children}
    </CardWidthContext.Provider>
  )
}

export const useCardWidth = (): CardWidthContext => useContext(CardWidthContext)
