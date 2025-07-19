import { CategoryCard } from "@app/components/Card/CategoryCard"
import { ProductCard } from "@app/components/Card/ProductCard"
import { VariantCard } from "@app/components/Card/VariantCard"
import { MediaCard } from "@app/components/Card/MediaCard"
import { BlogCard } from "@app/components/Card/BlogCard"
import { BlogCardCondensed } from "@app/components/Card/BlogCardCondensed"

import {
  BlogCardProps,
  CategoryCardProps,
  MediaCardProps,
  ProductCardProps,
  VariantCardProps,
} from "@app/components/Card/types"

export type CardComponentsMap = {
  product: React.FC<ProductCardProps>
  category: React.FC<CategoryCardProps>
  variant: React.FC<VariantCardProps>
  blog: React.FC<BlogCardProps>
  "blog-condensed": React.FC<BlogCardProps>
  media: React.FC<MediaCardProps>
}

export const cardComponentsMap: CardComponentsMap = {
  product: ProductCard,
  category: CategoryCard,
  variant: VariantCard,
  blog: BlogCard,
  "blog-condensed": BlogCardCondensed,
  media: MediaCard,
}
