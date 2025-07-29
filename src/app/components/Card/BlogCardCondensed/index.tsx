import React from "react"

import { BlogCardProps } from "../types"
import { Card } from "../Base"
import { DisplayDate } from "@app/components/Date"

export const BlogCardCondensed: React.FC<BlogCardProps> = ({ doc }) => {
  const { title, publishedOn, breadcrumbs } = doc
  return (
    <Card href={breadcrumbs[0].url}>
      <DisplayDate date={publishedOn} className="opacity-60" />
      <h4 className="!mt-2">{title}</h4>
    </Card>
  )
}
