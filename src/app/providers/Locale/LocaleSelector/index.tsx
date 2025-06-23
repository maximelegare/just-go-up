'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select'
import React from 'react'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useCurrentLocale } from 'next-i18n-router/client'
import i18nConfig, { locales, defaultLocale } from 'ROOT/i18nConfig'
import { revalidateGlobals } from '@app/utilities/revalidate'

import { cn } from '@app/utilities/cn'

interface Props {
  triggerClassName?: string
}

export const LocaleSelector: React.FC<Props> = ({ triggerClassName }) => {
  const currentLocale = useCurrentLocale(i18nConfig)

  const router = useRouter()
  const currentPathname = usePathname()

  const handleChange = async (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`

    // redirect to the new locale path
    if (currentLocale === defaultLocale) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
    revalidateGlobals()
  }

  return (
    <Select onValueChange={handleChange} value={currentLocale}>
      <SelectTrigger
        className={cn('w-fit bg-transparent gap-2 pl-0 pt-0 md:pl-3 border-none', triggerClassName)}
      >
        <SelectValue placeholder="Locale" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((l) => (
          <SelectItem key={l.locale} value={l.locale}>
            {l.locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
