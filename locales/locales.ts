export const locales = [
  { locale: 'fr', labels: { fr: 'Français', en: 'French' }, flag: '🇫🇷' },
  { locale: 'en', labels: { fr: 'Anglais', en: 'English' }, flag: '🇬🇧' },
] as const

export const defaultLocale = 'fr'

export type Locale = (typeof locales)[number]['locale'] | 'all'

export const defaultNameSpace = 'translations'

export function getOptions(lng = defaultLocale, ns = defaultNameSpace) {
  return {
    // debug: true,
    supportedLngs: locales.map((l) => l.locale),
    defaultLocale,
    lng,
    fallbackNS: defaultNameSpace,
    defaultNameSpace,
    ns,
  }
}
