import { CategoryCard } from '@app/components/Card/CategoryCard'
import { ProductCard } from '@app/components/Card/ProductCard'
import { VariantCard } from '@app/components/Card/VariantCard'
import { MediaCard } from '@app/components/Card/MediaCard'

import {
  CategoryCardProps,
  MediaCardProps,
  ProductCardProps,
  VariantCardProps,
} from '@app/components/Card/types'

export type CardComponentsMap = {
  products: React.FC<ProductCardProps>
  categories: React.FC<CategoryCardProps>
  variants: React.FC<VariantCardProps>
  media: React.FC<MediaCardProps>
}

export const cardComponentsMap: CardComponentsMap = {
  products: ProductCard,
  categories: CategoryCard,
  variants: VariantCard,
  media: MediaCard,
}
