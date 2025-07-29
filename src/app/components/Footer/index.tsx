import { getCachedGlobal } from "@app/utilities/getGlobals"
import React from "react"

import type { Footer } from "@payload-types"

import { CMSLink } from "../Link"
import { Locale } from "ROOT/locales/locales"
import { getServerSideURL } from "@app/utilities/getServerSideURL"

type FooterProps = {
  locale: Locale
  show: boolean
}

export async function Footer({ locale, show }: FooterProps) {
  //@ts-ignore
  const { links }: Footer = await getCachedGlobal("footer", 2, locale)()

  const fullPath = await getServerSideURL("fullpath")

  if (!show) return null

  return (
    <footer className="fixed bottom-0 bg-muted/40 text-white  w-full">
      <div className="w-[17rem] xl:w-[26rem] pl-5 pr-8">
        <div className="w-full flex items-center h-full gap-x-3 py-2 flex-wrap">
          {links.map(({ link }, idx: number) => {
            return (
              <CMSLink
                currentUrl={fullPath}
                key={idx}
                {...link}
                size="xs-noPadding"
                className="opacity-60"
              />
            )
          })}
        </div>
      </div>
    </footer>
  )
}
