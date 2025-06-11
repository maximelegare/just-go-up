'use client'
import React from 'react'

const Prerenderer = ({ numberOfCards }: { numberOfCards: number }) => {
  const { setCardWidth, setContainerWidth } = usePrerenderer()
  const cardsArray = new Array(numberOfCards).fill(0)

  const cardRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (cardRef && 'current' in cardRef && cardRef.current) {
      const { width } = cardRef.current.getBoundingClientRect()
      setCardWidth(width)
    }
    if (containerRef && 'current' in containerRef && containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect()
      setContainerWidth(width)
    }
  }, [cardRef, containerRef])

  return (
    <div className="relative">
      <div className="absolute w-screen mx-auto z-[100]">
        <div className="container">
          <div
            ref={containerRef}
            className="grid gap-x-4 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]"
          >
            {cardsArray.map((_, idx) => (
              <div key={idx} ref={cardRef}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export interface CardWidthContext {
  setCardWidth: (size: number | null) => void
  cardWidth?: number
  containerWidth: number
  setContainerWidth: (size: number | null) => void
}

const initialContext: CardWidthContext = {
  setCardWidth: () => null,
  cardWidth: undefined,
  containerWidth: undefined,
  setContainerWidth: () => null,
}

const PrerendererContext = React.createContext(initialContext)

const PrerendererProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardWidth, setCardWidthState] = React.useState<number | undefined>(undefined)
  const [containerWidth, setContainerWidth] = React.useState<number | undefined>(undefined)

  const setCardWidth = React.useCallback((cardSizeToSet: number | null) => {
    setCardWidthState(cardSizeToSet)
  }, [])

  return (
    <PrerendererContext.Provider
      value={{ setCardWidth, cardWidth, containerWidth, setContainerWidth }}
    >
      {children}
    </PrerendererContext.Provider>
  )
}

const usePrerenderer = (): CardWidthContext => React.useContext(PrerendererContext)

export { PrerendererProvider, Prerenderer, usePrerenderer }
