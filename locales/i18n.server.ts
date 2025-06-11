import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './locales'

import { headers } from 'next/headers'
import { detectLocaleFromPathname } from '@app/utilities/detectLocale'

export const getCurrentLocale = async () => {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const locale = detectLocaleFromPathname(pathname)
  return locale
}

export const initI18next = async (lng?: string, ns?: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`./${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

export const translate = async (ns?: string, options = {}) => {
  const lng = await getCurrentLocale()
  const i18nextInstance = await initI18next(lng, ns)
  return {
    //@ts-expect-error
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  }
}
