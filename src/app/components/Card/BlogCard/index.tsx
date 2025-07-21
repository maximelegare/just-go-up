"use client"

import React from "react"
import { Card } from "../Base"
import { BlogCardProps } from "../types"
import { Media } from "@app/components/Media"
import { DisplayDate } from "@app/components/Date"
import { CategoryLabel } from "@app/components/CategoryLabel"

export const BlogCard: React.FC<BlogCardProps> = ({ doc }) => {
  const {
    title,
    subtitle,
    medias: { mainImage },
    publishedOn,
    categories,
    breadcrumbs,
  } = doc

  return (
    <Card className="px-2" href={breadcrumbs[0].url}>
      <div className="flex justify-between">
        <div>
          <DisplayDate date={publishedOn} className="opacity-60" />
          <div className="grid grid-cols-2 mt-6">
            <div className="flex flex-col gap-4 not-prose">
              <h3 className="font-bold leading-8">{title}</h3>
              <p>{subtitle}</p>
            </div>
            <div className="flex w-full justify-end">
              <div className="w-32 lg:w-52 xl:60">
                {mainImage && typeof mainImage !== "string" && (
                  <Media resource={mainImage} imgClassName="rounded-[0.5rem]" />
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-1 mt-3 h-fit ">
            {categories &&
              categories.map((el, idx) => {
                return typeof el !== "string" && <CategoryLabel text={el.title} key={idx} />
              })}
          </div>
        </div>
      </div>
    </Card>
  )
}
