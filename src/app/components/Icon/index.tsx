import { type SVGProps } from 'react'

import { type IconName } from './types/name'

import { cn } from '@app/utilities/cn'

export { IconName }

export function Icon({
  name,
  childClassName,
  className,
  children,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
  childClassName?: string
}) {
  if (children) {
    return (
      <span className={cn(`inline-flex items-center font gap-1.5`, childClassName)}>
        <Icon name={name} className={className} {...props} />
        {children}
      </span>
    )
  }
  return (
    <svg {...props} className={cn('fill-foreground inline self-center w-[2em] h-[2em]', className)}>
      <use href={`${process.env.NEXT_PUBLIC_SERVER_URL}/icons/sprite.svg#${name}`} />
    </svg>
  )
}
