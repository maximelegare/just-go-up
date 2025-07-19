import { CategoryCard } from "@app/components/Card/CategoryCard"
import { ProductCard } from "@app/components/Card/ProductCard"
import { VariantCard } from "@app/components/Card/VariantCard"
import { MediaCard } from "@app/components/Card/MediaCard"
import { BlogCard } from "@app/components/Card/BlogCard"
import {
  BlogCardProps,
  CategoryCardProps,
  MediaCardProps,
  ProductCardProps,
  VariantCardProps,
} from "@app/components/Card/types"

export type CardComponentsMap = {
  product: React.FC<ProductCardProps>
  categorie: React.FC<CategoryCardProps>
  variant: React.FC<VariantCardProps>
  blog: React.FC<BlogCardProps>
  media: React.FC<MediaCardProps>
}

export const cardComponentsMap: CardComponentsMap = {
  product: ProductCard,
  categorie: CategoryCard,
  variant: VariantCard,
  blog: BlogCard,
  media: MediaCard,
}
