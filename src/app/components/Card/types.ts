import { RelationTo } from '../../blocks/layouts/ItemsListBlock/ItemsList'
import { Category, Media, Product, Variant } from '@payload-types'
import { CSSProperties } from 'react'

export type BaseCard = {
  className?: string
  style?: CSSProperties
  relationTo: RelationTo
  title?: string

  // Used to have consistent width for cards in carousels
  // It uses the width of a card in a grid
}

export type ProductCardProps = BaseCard & {
  doc?: Product
  groupByProducts?: boolean
}

export type CategoryCardProps = BaseCard & {
  doc?: Category
}

export type MediaCardProps = BaseCard & {
  doc?: Media
}

export type VariantCardProps = BaseCard & {
  doc?: Variant
}
