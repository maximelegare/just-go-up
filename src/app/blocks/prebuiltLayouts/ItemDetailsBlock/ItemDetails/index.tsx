import React from 'react'

import { Item } from '@app/components/types'

import { DetailsComponentsMap, detailsComponentsMap } from '@app/_Map/details.map'
import { ItemDetailsLayoutProps } from '@app/blocks/prebuiltLayouts/ItemDetailsBlock'
import { ProductDetails } from './ProductDetails'

export type RelationTo = ItemDetailsLayoutProps['relationTo']

export type Props<T> = {
  doc: T
  relationTo: RelationTo
  searchParams?: Record<string, string>
}

export const ItemDetails = <T extends Item>(props: Props<T>) => {
  const { doc, relationTo, searchParams } = props

  if (typeof doc === 'object' && doc !== null) {
    if (relationTo && relationTo in detailsComponentsMap) {
      const Details = detailsComponentsMap[
        relationTo
      ] as DetailsComponentsMap[keyof DetailsComponentsMap]

      if (Details) {
        return <ProductDetails searchParams={searchParams} doc={doc as any} />
      }
    }
    return null
  }
  return null
}
