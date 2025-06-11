import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Page } from '@payload-types'
import { Locale } from 'ROOT/locales/locales'
import { PayloadRedirects } from '@app/components/PayloadRedirects'
import { ItemDetails } from '@app/blocks/prebuiltLayouts/ItemDetailsBlock/ItemDetails'

export type ItemDetailsLayoutProps = Extract<
  Page['prebuiltLayout'][0],
  { blockType: 'itemDetails' }
>

export const ItemDetailsBlock: React.FC<
  ItemDetailsLayoutProps & {
    id?: string
    searchParams?: Record<string, string>
    params?: {
      locale?: Locale
      url?: string
      slugs?: string[]
    }
  }
> = async (props) => {
  const { params, relationTo, searchParams } = props

  const payload = await getPayload({ config: configPromise })

  const fetchedItem = await payload.find({
    collection: relationTo,
    locale: params.locale,
    limit: 1,
    where: {
      slug: {
        equals: params?.slugs[1],
      },
    },
  })

  const doc = fetchedItem?.docs?.[0] || null

  if (!doc) return <PayloadRedirects url={params.url} />

  return <ItemDetails searchParams={searchParams} doc={doc} relationTo={relationTo} />
}
