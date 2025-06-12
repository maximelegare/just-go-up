import React from 'react'

import { Logo } from '@app/components/Logo/Official'
import type { Header } from '@payload-types'
import { Locale } from 'ROOT/locales/locales'
import Link from 'next/link'
import { Sidebar } from '@app/components/Sidebar'
import { NavigationMenu } from '@app/components/HeaderNavigationMenu'
import { Background } from './background'
import { AdminBar } from '../AdminBar'

type HeaderProps = {
  locale: Locale
  show: boolean
}

export async function Header({ locale, show }: HeaderProps) {
  if (!show) return null
  return (
    <header className="fixed z-20 w-screen" id="header">
      <AdminBar />
      <div className="relative h-16 items-center flex justify-between">
        <div className="flex container items-center gap-6 w-full justify-between md:justify-normal">
          <Link href="/" className="z-50">
            <Logo />
          </Link>
          <div className="hidden md:block">
            <NavigationMenu locale={locale} />
          </div>
          <div className="relative z-30 block md:hidden">
            <Sidebar locale={locale} />
          </div>
        </div>
      </div>
      {/* used only for the mobile sizes. The other sizes are using the background located in NavigationMenu */}
      <Background className="block md:hidden" />
    </header>
  )
}
