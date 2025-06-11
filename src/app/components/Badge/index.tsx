import { cn } from '@app/utilities/cn'
import { classNames } from '@app/(frontend)/[locale]/styles/base'
import React from 'react'

type BadgeProps = {
  title: string
  show: boolean
  className?: string
}
export const Badge: React.FC<BadgeProps> = ({ title, show, className }) => {
  if (!show) return null

  return (
    <small
      className={cn(
        'p-[1px] opacity-100 text-black rounded-r-lg bg-accent w-fit',
        classNames,
        className,
      )}
    >
      {title}
    </small>
  )
}
