import { cn } from '@app/utilities/cn'
import React from 'react'

type AspectRatioProps = {
  width: string
  ratio: string
  children: React.ReactElement
}

export const AspectRatio: React.FC<AspectRatioProps> = ({ ratio, width, children }) => (
  <div className={cn('relative', ratio, width)}>{children}</div>
)
