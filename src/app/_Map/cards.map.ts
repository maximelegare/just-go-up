import { CategoryCard } from '@app/components/Card/CategoryCard'
import { ProductCard } from '@app/components/Card/ProductCard'
import { VariantCard } from '@app/components/Card/VariantCard'
import { MediaCard } from '@app/components/Card/MediaCard'
import { BlogCard } from '@app/components/Card/BlogCard'
import {
  BlogCardProps,
  CategoryCardProps,
  MediaCardProps,
  ProductCardProps,
  VariantCardProps,
} from '@app/components/Card/types'

export type CardComponentsMap = {
  products: React.FC<ProductCardProps>
  categories: React.FC<CategoryCardProps>
  variants: React.FC<VariantCardProps>
  blogs: React.FC<BlogCardProps>
  media: React.FC<MediaCardProps>
}

export const cardComponentsMap: CardComponentsMap = {
  products: ProductCard,
  categories: CategoryCard,
  variants: VariantCard,
  blogs: BlogCard,
  media: MediaCard,
}
