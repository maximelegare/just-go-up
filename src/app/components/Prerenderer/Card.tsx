'use client'

import React, { forwardRef } from 'react'
import { usePrerenderer } from '.'

type Props = {
  children: React.ReactNode
  isPrerendered: boolean
}

export const PrerendedCard = forwardRef<HTMLElement, Props>(
  ({ children, isPrerendered = true }, ref) => {
    const { cardWidth } = usePrerenderer()
    return (
      <article ref={ref} style={{ width: isPrerendered ? cardWidth : '100%' }}>
        {isPrerendered ? isPrerendered && cardWidth && children : children}
      </article>
    )
  },
)

PrerendedCard.displayName = 'PrerendedCard'
