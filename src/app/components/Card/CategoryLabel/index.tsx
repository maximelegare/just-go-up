"use client"
import { cn } from "@app/utilities/cn"
import React from "react"

import { CategoryLabelprops } from "../types"
import { useRouter } from "next/navigation"

export const CategoryLabel: React.FC<CategoryLabelprops> = ({ doc, className }) => {
  const { size = "sm", title, breadcrumbs: propsBreadcrumbs, slug } = doc
  const { push } = useRouter()

  const breadcrumbs = typeof propsBreadcrumbs[0] === "object" && propsBreadcrumbs[0]?.url?.slice(1)
  const url = encodeURI(`/home?filter=category:${breadcrumbs || slug}`)

  return (
    <p
      onClick={(e) => {
        e.stopPropagation()
        push(url)
      }}
      className={cn(
        "cursor-pointer font-light text-xs rounded-2xl bg-muted w-fit not-prose",
        size === "sm" ? "p-1" : "p-3",
        className,
      )}
    >
      {title}
    </p>
  )
}
