import { CategoryCard } from '@app/components/Card/CategoryCard'

import { CategoryCardProps } from '@app/components/Card/types'
import {
  ProductDetails,
  ProductDetailsProps,
} from '@app/blocks/prebuiltLayouts/ItemDetailsBlock/ItemDetails/ProductDetails'

export type DetailsComponentsMap = {
  products: React.FC<ProductDetailsProps>
  categories: React.FC<CategoryCardProps>
}

export const detailsComponentsMap: DetailsComponentsMap = {
  products: ProductDetails,
  categories: CategoryCard,
}
