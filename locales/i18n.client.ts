'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, locales } from './locales'
import { useCurrentLocale } from 'next-i18n-router/client'
import i18nConfig from 'ROOT/i18nConfig'

const runsOnServerSide = typeof window === 'undefined'

// Initialize i18next outside of components
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`./${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? locales.map((l) => l.locale) : [],
    react: {
      useSuspense: false,
      transEmptyNodeValue: '',
    },
  })

export function useTranslate(ns?: string, options = {}) {
  const [isClient, setIsClient] = useState(false)
  const lng = useCurrentLocale(i18nConfig)
  const translation = useTranslationOrg(ns, options)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && lng && translation.i18n.resolvedLanguage !== lng) {
      translation.i18n.changeLanguage(lng)
    }
  }, [isClient, lng, translation.i18n])

  // Return empty strings during SSR to prevent hydration mismatches
  if (!isClient) {
    return {
      ...translation,
      t: () => '',
    }
  }

  return translation
}
