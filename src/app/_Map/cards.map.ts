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
import { CMSLink, CMSLinkType } from "@app/components/Link"

export const cardComponentsMap: CardComponentsMap = {
  category: CategoryCard,
  blog: BlogCard,
  "blog-condensed": BlogCardCondensed,
  "category-label": CategoryLabel,
  media: MediaCard,
  link: CMSLink,
}

export type CardPropsMap = {
  category: CategoryCardProps
  blog: BlogCardProps
  "blog-condensed": BlogCardProps
  media: MediaCardProps
  "category-label": CategoryLabelprops
  link: CMSLinkType
}

export type CardComponentsMap = {
  [K in keyof CardPropsMap]: React.FC<CardPropsMap[K]>
}
