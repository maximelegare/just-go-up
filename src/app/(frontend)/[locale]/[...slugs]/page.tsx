import type { Metadata } from 'next'

import { PayloadRedirects } from '@app/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode, headers } from 'next/headers'
import React from 'react'

import { Blocks } from '../../../components/Blocks'
import { Hero } from '../../../components/Hero'
import { generateMeta } from '../../../utilities/generateMeta'
import { Locale, defaultLocale } from 'ROOT/locales/locales'
import { generatePageSlug } from '@app/utilities/generatePageSlug'
import { PrebuiltLayouts } from '@app/components/PrebuiltLayouts'
import { AppSidebar } from '@app/components/Sidebar'
import { cn } from '@app/utilities/cn'

export const dynamic = 'force-dynamic'

export async function generateStaticParams({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    locale,
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
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
  const { slugs = ['home'], locale = defaultLocale } = await params
  const { slug, url } = generatePageSlug(slugs)

  const page = await queryPageBySlug({
    slug,
    locale: locale as Locale,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout, hasPrebuiltLayout, prebuiltLayout, showRightSidebar } = page

  return (
    <article className="pb-24">
      <PayloadRedirects disableNotFound url={url} />
      <Hero {...hero} />
      <div className={cn(showRightSidebar && 'block sm:flex')}>
        <div className="container">
          {hasPrebuiltLayout ? (
            <PrebuiltLayouts
              blocks={prebuiltLayout}
              searchParams={await searchParams}
              params={{ locale, url, slugs }}
            />
          ) : (
            <Blocks
              blocks={layout}
              urlSearchParams={await searchParams}
              params={{ locale, url, slugs }}
            />
          )}
        </div>
        {showRightSidebar && <AppSidebar />}
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
  const { slugs = ['home'], locale } = await params
  const { slug } = generatePageSlug(slugs)

  const page = await queryPageBySlug({
    slug,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })
  const authResult = draft ? await payload.auth({ headers: await headers() }) : undefined

  const user = authResult?.user

  //  const res =  (await getCachedDocument("pages", slug)()) as PageType

  const result = await payload.find({
    locale,
    collection: 'pages',
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
