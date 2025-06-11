import { cn } from '@app/utilities/cn'
import React from 'react'

type JustifyBetweenGridProps<T> = {
  items: T[]
  cardWidth: string
  columnsPerRow?: number
  children: React.ReactElement | React.ReactNode
}

export function JustifyBetweenGrid<T>({
  items,
  columnsPerRow = 3,
  children,
  cardWidth,
}: JustifyBetweenGridProps<T>) {
  const remainder = items.length % columnsPerRow
  const ghostsToAdd = remainder === 0 ? 0 : columnsPerRow - remainder

  return (
    <div className="flex flex-wrap justify-between  gap-y-2 gap-x-1">
      {children}
      {Array.from({ length: ghostsToAdd }).map((_, i) => (
        <div key={`ghost-${i}`} className={cn(cardWidth, 'invisible')}></div>
      ))}
    </div>
  )
}
