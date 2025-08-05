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
import { getCachedDocument, getDocument } from "@app/utilities/getDocument"
import { Page as PageType } from "@payload-types"

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

  const page = await queryPageContentBySlug({
    slug,
    locale: locale as Locale,
  })

  if (!page) {
    return <PayloadRedirects url={url} locale={locale} />
  }

  const { hero, layout, showRightSidebar } = page

  return (
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

  const payload = await getPayload({ config: configPromise })

  // Gets either the first argument of the url (checks if it is a collection)
  // Or uses Pages
  // Meant to render
  const collection = (payload.collections[urlSlugs[0]] ? urlSlugs[0] : "pages") as "pages" | "blogs"

  const page = await getDocument(
    collection,
    collection === "blogs" && urlSlugs && urlSlugs[1] ? urlSlugs[1] : slug,
    locale,
  )
  return generateMeta({ doc: page })
}

const queryPageContentBySlug = async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const result = (await getCachedDocument("pages", slug, locale)()) as PageType
  return result || null
}
