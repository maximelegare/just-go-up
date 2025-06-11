'use client'

import { cn } from '@app/utilities/cn'
import React, { forwardRef } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  href?: string
}

export const Card = forwardRef<HTMLElement, Props>(({ children, className, style, href }, ref) => {
  const { push } = useRouter()

  return (
    <article
      onClick={() => href && push(href)}
      ref={ref}
      style={{
        ...style,
      }}
      className={cn(
        'border rounded-lg overflow-hidden bg-card hover:cursor-pointer group w-full',
        className,
        // Use Tailwind's responsive utilities for default behavior
        'w-full sm:w-auto',
      )}
    >
      {children}
    </article>
  )
})

Card.displayName = 'Card'
