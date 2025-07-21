import React from "react"
import { Sidebar } from "@app/components/ui/sidebar"
import { Locale } from "ROOT/locales/locales"

import { Sidebars } from "@payload-types"
import { getGlobal } from "@app/utilities/getGlobals"
import { Blocks } from "../Blocks"

type SidebarProps = {
  locale: Locale
  show: boolean
  side: "right"
  params: {
    locale?: Locale
    url?: string
    slugs?: string[]
  }
}

export const RightSidebar: React.FC<SidebarProps> = async ({ show, locale, side, params }) => {
  const sidebar: Sidebars = await getGlobal("sidebars", 2, locale)

  if (!show) return null

  return (
    <Sidebar side="right">
      <div className="pl-5 pr-8  h-ful pt-[112px] flex flex-col gap-4">
        <Blocks blocks={sidebar[side].sections} params={params} />
      </div>
    </Sidebar>
  )
}
