import { cn } from '@app/utilities/cn'
import React from 'react'

type AspectRatioProps = {
  width: string
  ratio: string
  children: React.ReactElement
  className?: string
}

export const AspectRatio: React.FC<AspectRatioProps> = ({ ratio, width, children, className }) => (
  <div className={cn('relative', ratio, width)}>
    <div className={cn('absolute inset-0 rounded overflow-hidden', className)}>{children}</div>
  </div>
)
