import { regexSlugs } from '@app/_Map/regex.map'

const exclude = ['icons', 'sprite.svg']

const createUrlFromSlugs = (slugs: string[]) =>
  '/' + slugs.filter((slug) => !exclude.includes(slug)).join('/')

type GenerateSlug = (slugs: string[]) => { url: string; slug: string }

export const generatePageSlug: GenerateSlug = (slugs: string[]) => {
  const url = createUrlFromSlugs(slugs)

  for (let i = 0; i < regexSlugs.length; i++) {
    if (url.match(regexSlugs[i].regex)) return { slug: regexSlugs[i].slug, url }
  }

  if (slugs.length === 1) return { slug: slugs[0], url }
  else return { slug: null, url: url }
}
