import React from 'react'

import { cn } from '@app/utilities/cn'

import { CMSLinkType } from '@app/components/Link'
import { Icon } from '@app/components/Icon'

export const BaseButton: React.FC<CMSLinkType> = (props) => {
  const { appearance, icon, label, children } = props

  return (
    <span
      className={cn(
        (appearance === 'underline' || appearance === 'link' || appearance === 'iconOnly') &&
          'inline-flex items-center tracking-[0.1em]',
      )}
    >
      {icon?.position !== 'right' && icon?.type && (
        <Icon name={icon?.type} className={icon?.className} />
      )}
      {label && label}
      {icon?.position === 'right' && icon?.type && (
        <Icon name={icon.type} className={icon?.className} />
      )}
      {children && children}
    </span>
  )
}
