import { CategoryCard } from "@app/components/Card/CategoryCard"
import { MediaCard } from "@app/components/Card/MediaCard"
import { BlogCard } from "@app/components/Card/BlogCard"
import { BlogCardCondensed } from "@app/components/Card/BlogCardCondensed"

import {
  BlogCardProps,
  CategoryCardProps,
  CategoryLabelprops,
  MediaCardProps,
} from "@app/components/Card/types"
import { CategoryLabel } from "@app/components/Card/CategoryLabel"

export type CardComponentsMap = {
  category: React.FC<CategoryCardProps>
  blog: React.FC<BlogCardProps>
  "blog-condensed": React.FC<BlogCardProps>
  media: React.FC<MediaCardProps>
  "category-label": React.FC<CategoryLabelprops>
}

export const cardComponentsMap: CardComponentsMap = {
  category: CategoryCard,
  blog: BlogCard,
  "blog-condensed": BlogCardCondensed,
  "category-label": CategoryLabel,
  media: MediaCard,
}
