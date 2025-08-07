import type { Metadata } from "next"
// import "ROOT/i18nInit"

import { cn } from "@app/utilities/cn"

import { Inter } from "next/font/google"

import React from "react"

// import { Footer } from '../../components/Footer'
import { Header } from "../../components/Header"
import { LivePreviewListener } from "../../components/LivePreviewListener"
import { Providers } from "@app/providers"
import { mergeOpenGraph } from "@app/utilities/mergeOpenGraph"
import "./styles/globals.css"
// import { ScrollArea } from '@app/components/ui/scroll-area'
import { getGlobal } from "@app/utilities/getGlobals"
import { Settings } from "@payload-types"
import { getMeUser } from "@app/utilities/getMeUser"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
// import { PreloadResources } from '@app/components/PreloadRessources'
import { detectLocaleFromPathname } from "@app/utilities/detectLocale"
import { Prerenderer } from "@app/components/Prerenderer"
import { AdminBar } from "@app/components/AdminBar"
import { Plausible } from "@app/components/Plausible"
// import { AppSidebar } from '@app/components/Sidebar'

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings: Settings = await getGlobal("settings")
  const meUser = await getMeUser()

  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || ""
  const locale = detectLocaleFromPathname(pathname)

  if (
    settings.underConstruction &&
    (!meUser.user || !meUser.user.roles.includes("admin") || !meUser.user.roles.includes("super"))
  ) {
    if (!pathname.includes("under-construction")) redirect("/under-construction")
  }

  return (
    <html data-theme="light" className={cn(inter.className)} lang="en" suppressHydrationWarning>
      <head>
        {/* <PreloadResources /> */}
        <link rel="preload" as="fetch" crossOrigin="anonymous" href="/icons/sprite.svg" />
        {/* <link href="/favicon.ico" rel="icon" sizes="32x32" /> */}
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <Plausible disableAnalytics={settings.disableAnalytics} />
      </head>

      <body>
        <Providers>
          <div className="prose">
            <LivePreviewListener />
            <AdminBar />
            <Header
              locale={locale}
              show={!pathname.includes("under-construction")}
              showLocaleSwitcher={settings?.showLocaleSwitcher || false}
            />
            {children}
            <Prerenderer numberOfCards={4} />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || "https://payloadcms.com"),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
}
