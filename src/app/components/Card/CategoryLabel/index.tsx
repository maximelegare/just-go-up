"use client"
import { cn } from "@app/utilities/cn"
import React from "react"

import { CategoryLabelprops } from "../types"
import { useRouter } from "next/navigation"
import { useClientSideUrl } from "@app/utilities/useClientSideUrl"

export const CategoryLabel: React.FC<CategoryLabelprops> = ({ doc, className }) => {
  const { size = "sm", title, breadcrumbs } = doc
  const { push } = useRouter()

  const currentUrl = useClientSideUrl()

  const url = breadcrumbs[0] && breadcrumbs[0]?.url

  return (
    <p
      onClick={() => push(url || currentUrl)}
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
