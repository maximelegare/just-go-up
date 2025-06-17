'use client'

import React from 'react'
import { Icon } from '../Icon'
import {} from 'next-i18n-router'
import { usePathname } from 'next/navigation'
import { detectLocaleFromPathname } from '@app/utilities/detectLocale'

type DateProps = {
  date: string | Date
  lang?: 'en' | 'fr'
  showCalendarIcon?: boolean
}

export const DisplayDate: React.FC<DateProps> = ({ date, lang, showCalendarIcon = true }) => {
  const pathname = usePathname()
  const currLocale = detectLocaleFromPathname(pathname)

  const dateStr = new Date(date)

  let formatted: string

  if (typeof date === 'string') {
    formatted = new Intl.DateTimeFormat(`${lang || currLocale}-CA`, {
      month: 'short',
      year: 'numeric',
      day: '2-digit',
    }).format(dateStr)
  }

  return (
    <div className="flex items-center gap-2">
      {showCalendarIcon && <Icon name="radix/calendar" className="text-[0.5em]" />}
      <div className="text-xs">{formatted}</div>
    </div>
  )
}
