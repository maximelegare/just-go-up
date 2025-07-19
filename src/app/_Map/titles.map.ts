import { TitleSectionBlockProps } from "@app/blocks/layouts/TitleSectionBlock"
import { HighImpactTitle } from "@app/blocks/layouts/TitleSectionBlock/HighImpact"
import { LowImpactTitle } from "@app/blocks/layouts/TitleSectionBlock/LowImpact"

// export type CardComponentsMap = {
//   product: React.FC<ProductCardProps>
//   category: React.FC<CategoryCardProps>
//   variant: React.FC<VariantCardProps>
//   blog: React.FC<BlogCardProps>
//   "blog-condensed": React.FC<BlogCardProps>
//   media: React.FC<MediaCardProps>
// }

// export const cardComponentsMap: CardComponentsMap = {
//   product: ProductCard,
//   category: CategoryCard,
//   variant: VariantCard,
//   blog: BlogCard,
//   "blog-condensed": BlogCardCondensed,
//   media: MediaCard,
// }

export type TitleComponentsMap = {
  highImpact: React.FC<TitleSectionBlockProps>
  lowImpact: React.FC<TitleSectionBlockProps>
}

export const titlesComponentsMap: TitleComponentsMap = {
  highImpact: HighImpactTitle,
  lowImpact: LowImpactTitle,
}
