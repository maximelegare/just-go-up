import { Locale, locales, defaultLocale } from 'ROOT/locales/locales'

export const detectLocaleFromPathname = (pathname: string): Locale => {
  const localesKeys = locales.map((el) => el.locale) as string[]
  const urlLocale = pathname.split('/').filter(Boolean)[0]

  if (localesKeys.includes(urlLocale)) {
    return urlLocale as Locale
  } else {
    return defaultLocale
  }
}
