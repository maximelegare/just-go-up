// import { RelationTo } from './ItemDetails'
import { Category, Media, Product, Variant } from '@payload-types'

export type Item = Product | Category | Media | Variant

export const isProduct = (relationTo: unknown, item: Item): item is Product =>
  relationTo === 'products'

export const isCategory = (relationTo: unknown, item: Item): item is Category =>
  relationTo === 'categories'

export const isVariant = (relationTo: unknown, item: Item): item is Variant =>
  relationTo === 'variants'

export const isTypedObject = <T extends object>(element: unknown): element is T =>
  typeof element === 'object' && element !== null
