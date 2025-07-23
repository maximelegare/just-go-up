import { CategoryCard } from "@app/components/Card/CategoryCard"
import { MediaCard } from "@app/components/Card/MediaCard"
import { BlogCard } from "@app/components/Card/BlogCard"
import { BlogCardCondensed } from "@app/components/Card/BlogCardCondensed"

import { BlogCardProps, CategoryCardProps, MediaCardProps } from "@app/components/Card/types"

export type CardComponentsMap = {
  category: React.FC<CategoryCardProps>
  blog: React.FC<BlogCardProps>
  "blog-condensed": React.FC<BlogCardProps>
  media: React.FC<MediaCardProps>
}

export const cardComponentsMap: CardComponentsMap = {
  category: CategoryCard,
  blog: BlogCard,
  "blog-condensed": BlogCardCondensed,
  media: MediaCard,
}
