import React from "react"

import { BlogCardProps } from "../types"
import { Card } from "../Base"
import { DisplayDate } from "@app/components/Date"

export const BlogCardCondensed: React.FC<BlogCardProps> = ({ doc }) => {
  const { title, publishedOn, breadcrumbs: propsBreadcrumbs, slug } = doc

  const breadcrumbs = typeof propsBreadcrumbs[0] === "object" && propsBreadcrumbs[0]?.url
  const url = breadcrumbs || `/blogs/${slug}`

  return (
    <Card href={url}>
      <DisplayDate date={publishedOn} className="opacity-60" />
      <h4 className="!mt-2">{title}</h4>
    </Card>
  )
}
