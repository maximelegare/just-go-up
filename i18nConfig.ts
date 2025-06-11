import { Config } from 'next-i18n-router/dist/types'
import { defaultLocale, locales } from './locales/locales'

const i18nConfig: Config = {
  defaultLocale,
  locales: locales.map((l) => l.locale),
}

export { locales, defaultLocale }
export default i18nConfig
