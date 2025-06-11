'use client'
import { useCardWidth } from '@app/providers/CardWidth'
import React, { useLayoutEffect } from 'react'

export const PreRenderCardsGrid = () => {
  const { setCardWidth, setContainerWidth } = useCardWidth()

  const cardRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (cardRef && 'current' in cardRef && cardRef.current) {
      const { width } = cardRef.current.getBoundingClientRect()
      setCardWidth(width)
    }
    if (containerRef && 'current' in containerRef && containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect()
      setContainerWidth(width)
      console.log('WIDTH::', width)
    }
  }, [cardRef, containerRef])

  return (
    <div className="relative">
      <div className="absolute w-screen mx-auto z-50">
        <div className="container">
          <div
            ref={containerRef}
            className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]"
          >
            <div ref={cardRef} className="h-16 bg-red-400"></div>
            <div className="h-16 bg-blue-500"></div>
            <div className="h-16 bg-green-400"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

{
  /* <div className="container">
<div className="grid gap-4 
      "
 style={{gridTemplateColumns:"repeat(auto-fit,minmax(15em,1fr))"}} 
>
  <div className="h-16 bg-red-400"></div>
  <div className="h-16 bg-blue-500"></div>
  <div className="h-16 bg-green-400"></div>
</div>
</div> */
}

// ;<div className="container mx-auto px-4">
//   <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
//     <div className="h-16 bg-red-400"></div>
//     <div className="h-16 bg-blue-500"></div>
//     <div className="h-16 bg-green-400"></div>
//   </div>
// </div>
