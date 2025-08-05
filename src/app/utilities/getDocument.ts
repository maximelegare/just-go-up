import type { Config } from "src/payload-types"

import configPromise from "@payload-config"
import { getPayload } from "payload"
import { unstable_cache } from "next/cache"
import { draftMode, headers } from "next/headers"
import { Locale } from "ROOT/locales/locales"

type Collection = Exclude<
  keyof Config["collections"],
  | "categories"
  | "media"
  | "links"
  | "users"
  | "search-param-keys"
  | "search-param-values"
  | "optionsBars"
  | "redirects"
  | "forms"
  | "form-submissions"
  | "payload-locked-documents"
  | "payload-preferences"
  | "payload-migrations"
>

export async function getDocument(collection: Collection, slug: string, locale: Locale) {
  const payload = await getPayload({ config: configPromise })

  const { isEnabled: draft } = await draftMode()
  const authResult = draft ? await payload.auth({ headers: await headers() }) : undefined

  const user = authResult?.user

  const result = await payload.find({
    locale,
    collection: collection,
    draft,
    limit: 1,
    depth: 5,
    overrideAccess: false,
    user,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (collection: Collection, slug: string, locale: Locale) =>
  unstable_cache(async () => getDocument(collection, slug, locale), [collection, slug], {
    tags: [`${collection}_${slug}`],
  })
