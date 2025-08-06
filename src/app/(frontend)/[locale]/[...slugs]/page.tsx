import type { Metadata } from "next"

import { PayloadRedirects } from "@app/components/PayloadRedirects"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import React from "react"

import { Blocks } from "../../../components/Blocks"
import { Hero } from "../../../components/Hero"
import { generateMeta } from "../../../utilities/generateMeta"
import { Locale, defaultLocale } from "ROOT/locales/locales"
import { generatePageSlug } from "@app/utilities/generatePageSlug"
import { RightSidebar } from "@app/components/Sidebar"
import { cn } from "@app/utilities/cn"
import { draftMode, headers } from "next/headers"
import { Page as PageType } from "@payload-types"
// import { Plausible } from "@app/components/Plausible"

export const dynamic = "force-dynamic"

export async function generateStaticParams({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: "pages",
    locale,
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home"
    })
    .map(({ slug }) => ({ slug: slug }))
}

export default async function Page({
  params,
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>
  params: Promise<{ slugs: string[]; locale: Locale }>
}) {
  const { slugs = ["home"], locale = defaultLocale } = await params
  const { slug, url } = generatePageSlug(slugs)

  const page = (await queryPageBySlug({
    collection: "pages",
    slug,
    locale: locale as Locale,
  })) as PageType

  if (!page) {
    return <PayloadRedirects url={url} locale={locale} />
  }

  const { hero, layout, showRightSidebar } = page

  return (
    <>
      {/* <Plausible disableAnalytics={disableAnalytics} disablePageAnalytics={disablePageAnalytics} /> */}
      <article className="pb-24">
        <PayloadRedirects disableNotFound url={url} locale={locale} />
        <Hero {...hero} />
        <div className={cn(showRightSidebar && "block sm:flex")}>
          <div className="container">
            <Blocks
              blocks={layout}
              urlSearchParams={await searchParams}
              params={{ locale, url, slugs }}
            />
          </div>
          <RightSidebar
            locale={locale}
            show={showRightSidebar}
            side="right"
            params={{ locale, url, slugs }}
          />
        </div>
      </article>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slugs: string[]
    locale: Locale
  }>
}): Promise<Metadata> {
  const { slugs = ["home"], locale } = await params
  const { slug, urlSlugs } = generatePageSlug(slugs)

  // Gets either the first argument of the url (checks if it is a collection)
  // Or uses Pages
  // Meant to render
  const collectionSlug = urlSlugs[0]
  const collection = collectionSlug === "blogs" ? "blogs" : "pages"

  const page = await queryPageBySlug({
    collection,
    locale,
    slug: collection === "blogs" && urlSlugs && urlSlugs[1] ? urlSlugs[1] : slug,
  })
  return generateMeta({ doc: page })
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{
//     slugs: string[]
//     locale: Locale
//   }>
// }): Promise<Metadata> {
//   const { slugs = ["home"], locale } = await params
//   const { slug } = generatePageSlug(slugs)

//   const page = await queryPageBySlug({
//     slug,
//     locale,
//   })

//   return generateMeta({ doc: page })
// }

const queryPageBySlug = async ({
  slug,
  locale,
  collection,
}: {
  slug: string
  locale: Locale
  collection: "pages" | "blogs"
}) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })
  const authResult = draft ? await payload.auth({ headers: await headers() }) : undefined

  const user = authResult?.user

  //  const res =  (await getCachedDocument("pages", slug)()) as PageType

  const result = await payload.find({
    locale,
    collection,
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

  return result.docs[0] || null
}
