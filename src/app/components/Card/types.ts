import { RelationTo } from "../../blocks/layouts/ItemsListBlock/ItemsList"
import { Blog, Category, Media } from "@payload-types"
import { CSSProperties } from "react"

export type BaseCard = {
  className?: string
  style?: CSSProperties
  relationTo: RelationTo
  title?: string

  // Used to have consistent width for cards in carousels
  // It uses the width of a card in a grid
}

export type BlogCardProps = BaseCard & {
  doc?: Blog
}

export type CategoryCardProps = BaseCard & {
  doc?: Category
}

export type CategoryLabelprops = {
  doc?: Category & { size?: "sm" | "lg" }
  className?: string
}

export type MediaCardProps = BaseCard & {
  doc?: Media
}
