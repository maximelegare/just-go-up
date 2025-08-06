import { getCachedGlobal } from "@app/utilities/getGlobals"
import React from "react"

import type { Footer as FooterType } from "@payload-types"

import { CMSLink } from "../Link"
import { Locale } from "ROOT/locales/locales"
import { getServerSideURL } from "@app/utilities/getServerSideURL"
import { cn } from "@app/utilities/cn"

type FooterProps = {
  locale: Locale
  show: boolean
  fixed?: boolean
  className?: string
}

export async function Footer({ locale, show, className, fixed }: FooterProps) {
  // @ts-ignore
  const { links }: FooterType = await getCachedGlobal("footer", 2, locale)()

  const fullPath = await getServerSideURL("fullpath")

  return (
    <footer
      className={cn(
        "bg-muted/40 text-white w-full",
        fixed && "fixed bottom-0",
        !show ? "block md:hidden" : "", // Hide on larger screens if show is false, but always show on small
      )}
    >
      <div className={cn("", className)}>
        <div className="w-full flex items-center h-full gap-x-3 py-2 flex-wrap">
          {links.map(({ link }, idx: number) => (
            <CMSLink
              currentUrl={fullPath}
              key={idx}
              {...link}
              size="xs-noPadding"
              className="opacity-60"
            />
          ))}
        </div>
      </div>
    </footer>
  )
}
