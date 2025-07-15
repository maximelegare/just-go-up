import { cn } from '@app/utilities/cn'
import React from 'react'

interface Props {
  text: string
  size?: 'sm' | 'lg'
  className?: string
}

export const CategoryLabel: React.FC<Props> = ({ text, size = 'sm', className }) => {
  return (
    <p
      className={cn('text-xs rounded-2xl bg-muted w-fit', size === 'sm' ? 'p-1' : 'p-3', className)}
    >
      {text}
    </p>
  )
}
