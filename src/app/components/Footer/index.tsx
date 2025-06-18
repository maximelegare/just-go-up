import { getCachedGlobal } from '@app/utilities/getGlobals'
import React from 'react'

import type { Footer, GetInTouch } from '@payload-types'

import { CMSLink } from '../Link'
import { LocaleSelector } from '@app/providers/Locale/LocaleSelector'
import { Separator } from '@app/components/ui/seperator'
import { SocialMediaList } from '../SocialMediaList'
import { Locale } from 'ROOT/locales/locales'
import { getServerSideURL } from '@app/utilities/getServerSideURL'

type FooterProps = {
  locale: Locale
  show: boolean
}

export async function Footer({ locale, show }: FooterProps) {
  const { sections }: Footer = await getCachedGlobal('footer', 2, locale)()
  const getInTouch: GetInTouch = await getCachedGlobal('getInTouch', 2, locale)()

  const fullPath = await getServerSideURL('fullpath')

  if (!show) return null

  return (
    <footer className="border-t border-border bg-globals text-white">
      <div className="container pt-8 pb-16">
        <Separator />
        <div className="relative z-20">
          <div className="grid grid-rows-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
            {sections.map(({ section, links }, idx: number) => (
              <nav key={idx} className="flex flex-col gap-2 items-start h-full">
                <h5>{section}</h5>
                {links.map(({ link }, idx: number) => {
                  return <CMSLink currentUrl={fullPath} key={idx} {...link} />
                })}
              </nav>
            ))}
            <Separator className="visible md:hidden" />
            <nav className="flex-row gap-4">
              <div className="flex justify-between w-full items-center">
                <SocialMediaList getInTouch={getInTouch} />
                <LocaleSelector triggerClassName="justify-center" />
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* <div className="relative w-full">
        <AutoAjustingTextOverlay
          text={<div className="font-bold text-black">BIKANKYMTL</div>}
          containerClassName="w-full  z-10"
          textClassName="text-800"
        />
      </div> */}
    </footer>
  )
}
