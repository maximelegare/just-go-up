'use client'
import { cn } from '@app/utilities/cn'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  text: React.ReactNode
  maxFontSize?: number
  textClassName?: string
  containerClassName?: string
  clipPath?: string
}

export const AutoAjustingTextOverlay: React.FC<Props> = ({
  text,
  maxFontSize,
  textClassName,
  containerClassName,
  clipPath,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [fontSize, setFontSize] = useState<string>('10vw')

  useEffect(() => {
    const adjustFontSize = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        let textWidth = textRef.current.offsetWidth
        let currentFontSize = parseFloat(window.getComputedStyle(textRef.current).fontSize)

        while (textWidth > containerWidth && currentFontSize > 0) {
          if (maxFontSize && currentFontSize >= maxFontSize) break
          currentFontSize -= 1
          textRef.current.style.fontSize = `${currentFontSize}px`
          textWidth = textRef.current.offsetWidth
        }

        while (textWidth < containerWidth) {
          if (maxFontSize && currentFontSize >= maxFontSize) break
          currentFontSize += 1
          textRef.current.style.fontSize = `${currentFontSize}px`
          textWidth = textRef.current.offsetWidth
        }

        setFontSize(`${currentFontSize}px`)
      }
    }

    adjustFontSize()
    window.addEventListener('resize', adjustFontSize)

    return () => window.removeEventListener('resize', adjustFontSize)
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          'absolute w-screen  flex items-center justify-center top-0',
          containerClassName,
        )}
        style={{ clipPath: clipPath }}
      >
        <div
          ref={textRef}
          style={{ fontSize, mixBlendMode: 'overlay' }}
          className={cn('leading-none whitespace-nowrap m-0 p-0', textClassName)}
        >
          {text}
        </div>
      </div>
    </>
  )
}
