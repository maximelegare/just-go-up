import React from "react"
import { Sidebar } from "@app/components/ui/sidebar"
import { Locale } from "ROOT/locales/locales"

import { Sidebars } from "@payload-types"
import { getGlobal } from "@app/utilities/getGlobals"
import { Blocks } from "../Blocks"
import { getMeUser } from "@app/utilities/getMeUser"
import { cn } from "@app/utilities/cn"
import { Footer } from "../Footer"

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

export const RightSidebar: React.FC<SidebarProps> = async ({
  show: showFromProps,
  locale,
  side,
  params,
}) => {
  const sidebar: Sidebars = await getGlobal("sidebars", 2, locale)
  const meUser = await getMeUser()

  if (!showFromProps) return null

  return (
    <Sidebar side="right">
      <div className="relative">
        <div
          className={cn("pl-5 pr-8  h-ful flex flex-col gap-4", {})}
          style={{ marginTop: meUser.user ? 107 + 16 : 78 + 16 }}
        >
          <Blocks blocks={sidebar[side].sections} params={params} />
        </div>
        <Footer locale={locale} show fixed className="w-[17rem] xl:w-[26rem] pl-5 pr-8" />
      </div>
    </Sidebar>
  )
}
