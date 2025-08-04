import React from "react"

import { Logo } from "@app/components/Logo/Official"
import type { Header } from "@payload-types"
import { Locale } from "ROOT/locales/locales"
import Link from "next/link"
import { NavigationMenu } from "@app/components/HeaderNavigationMenu"
import { Separator } from "../ui/separator"
import { getCachedGlobal } from "@app/utilities/getGlobals"
import { LocaleSelector } from "@app/providers/Locale/LocaleSelector"

type HeaderProps = {
  locale: Locale
  show: boolean
  showLocaleSwitcher: boolean
}

export async function Header({ locale, show, showLocaleSwitcher }: HeaderProps) {
  // @ts-ignore
  const header: Header = await getCachedGlobal("header", 2, locale)()

  if (!show) return null

  return (
    <header id="header">
      <div className="fixed z-20 w-screen bg-background">
        <div className="relative h-16 items-center flex justify-between">
          <div className="flex px-4 sm:px-8 items-center gap-6 w-full justify-between">
            <div className="flex items-center">
              <Link href="/" className="z-50">
                <Logo />
              </Link>
              <div className="hidden md:block">
                <NavigationMenu locale={locale} header={header} />
              </div>
            </div>
            {showLocaleSwitcher && (
              <div className="relative z-30">
                <LocaleSelector triggerClassName="justify-center" />
              </div>
            )}
          </div>
        </div>
        <Separator />
      </div>
      <div className="h-16"></div>
    </header>
  )
}
