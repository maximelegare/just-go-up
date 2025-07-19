import React from "react"

import { CategoryLabel } from "@app/components/CategoryLabel"
import { BlogCardProps } from "../types"
import { Card } from "../Base"
import { DisplayDate } from "@app/components/Date"

export const BlogCardCondensed: React.FC<BlogCardProps> = ({ doc }) => {
  const { title, publishedOn, categories, breadcrumbs } = doc
  return (
    <Card href={breadcrumbs[0].url}>
      <DisplayDate date={publishedOn} className="opacity-60" />
      <h4 className="!mt-2">{title}</h4>
      <div className="flex gap-1 mt-4">
        {categories &&
          categories.map((el, idx) => {
            return typeof el !== "string" && <CategoryLabel text={el.title} key={idx} />
          })}
      </div>
    </Card>
  )
}
