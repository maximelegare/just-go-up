import type { Metadata } from 'next'
// import "ROOT/i18nInit"

import { cn } from '@app/utilities/cn'

import { Inter } from 'next/font/google'

import React from 'react'

// import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { LivePreviewListener } from '../../components/LivePreviewListener'
import { Providers } from '../../providers'
import { mergeOpenGraph } from '../../utilities/mergeOpenGraph'
import './styles/globals.css'
// import { ScrollArea } from '@app/components/ui/scroll-area'
import { getGlobal } from '@app/utilities/getGlobals'
import { Settings } from '@payload-types'
import { getMeUser } from '@app/utilities/getMeUser'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
// import { PreloadResources } from '@app/components/PreloadRessources'
import { detectLocaleFromPathname } from '@app/utilities/detectLocale'
import { Prerenderer } from '@app/components/Prerenderer'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings: Settings = await getGlobal('settings')
  const meUser = await getMeUser()

  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const locale = detectLocaleFromPathname(pathname)

  if (
    settings.underConstruction &&
    (!meUser.user || !meUser.user.roles.includes('admin') || !meUser.user.roles.includes('super'))
  ) {
    if (!pathname.includes('under-construction')) redirect('/under-construction')
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
        {/* <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg width='100' height='100' id='screenshot-f73fcbd6-430b-80ec-8006-536f46262c07' viewBox='-101 0 847.15727 881.22909' fill='none' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'%3E%3Cdefs id='defs5' /%3E%3Cg id='g1' transform='translate(1322.1644,397.45757)' style='fill:%23000000'%3E%3Crect style='fill:%23000000;stroke-width:0.922315' id='rect1' width='847.15735' height='881.22913' x='-1423.1644' y='-397.45755' ry='111.78944' /%3E%3Cg id='g24-6' style='fill:%23ffffff' transform='translate(-1277.0908,-339.24614)'%3E%3Cg id='shape-f73fcbd6-430b-80ec-8006-536f46262c08-7-7' style='fill:%23ffffff'%3E%3Cg class='fills' id='fills-f73fcbd6-430b-80ec-8006-536f46262c08-8-5' style='fill:%23ffffff'%3E%3Cpath d='M 361.5,21 C 201.169,21 71,151.169 71,311.5 71,471.831 201.169,602 361.5,602 435.798,602 503.618,574.048 555.01,528.095 496.855,593.653 411.968,635 317.5,635 142.267,635 0,492.733 0,317.5 0,142.267 142.267,0 317.5,0 380.969,0 440.114,18.664 489.74,50.798 451.106,31.737 407.547,21 361.5,21 Z' style='fill:%23ffffff;fill-opacity:1' id='path1-4-3' /%3E%3C/g%3E%3C/g%3E%3Cg id='shape-f73fcbd6-430b-80ec-8006-536f46262c09-5-5' style='fill:%23ffffff'%3E%3Cg class='fills' id='fills-f73fcbd6-430b-80ec-8006-536f46262c09-0-6' style='fill:%23ffffff'%3E%3Cpath d='m 334.631,619.955 35.964,-26.053 c 7.72,14.685 13.033,26.699 15.405,29.598 3,-1 1.598,-2.804 4,-1 4.585,3.444 3.977,10.313 7.5,20 2,5.5 17.274,1.263 24.5,11.5 12,17 2.784,19.048 8,42 5,22 6,43 -12,62 -16.056,16.948 -25,-2 -27,-11 -4,-18 -4,-42 -6,-45 -2,-3 -4,-3 -8,-14 -0.969,-2.664 1,-7.5 -2.5,-12 -6.005,-7.721 -9.453,-17.68 -14,-24.5 -3.656,-5.484 -15.296,-19.695 -25.869,-31.545 z' style='fill:%23ffffff;fill-opacity:1' id='path2-3-2' /%3E%3C/g%3E%3C/g%3E%3Cg id='shape-f73fcbd6-430b-80ec-8006-536f46262c0a-6-9' style='fill:%23ffffff'%3E%3Cg class='fills' id='fills-f73fcbd6-430b-80ec-8006-536f46262c0a-1-1' style='fill:%23ffffff'%3E%3Cpath d='M 48.688,486.438 C 17.848,437.499 0,379.568 0,317.5 0,182.284 84.709,66.696 203.909,20.956 L 218,21 c 0,0 10,15 10,30 0,15 2,-4 8,5 6,9 6,14 3,21 -3,7 -3,14 1,17 4,3 25,13 23,25 -2,12 -12,12 -11,28 1,16 -4,10 -4,10 0,0 2,4 1,8 -1,4 -1,7 -2,17 -1,10 -2,11 -2,11 -11,-5 -9,-1 -9,-1 0,0 -4,4 -6,14 -2,10 -7,17 -9,19 -2,2 -6,-1 -13,5 -7,6 -14,38 -20,41 -6,3 -23,37 -21,47 2,10 -1,29 -16,41 -15,12 -29,18 -31,31 -2,13 -21,30 -20,36 1,6 -22,43 -29,43 -5.747,0 -16.886,10.785 -22.312,17.438 z' style='fill:%23ffffff;fill-opacity:1' id='path3-0-2' /%3E%3C/g%3E%3C/g%3E%3Cg id='shape-f73fcbd6-430b-80ec-8006-536f46262c0b-6-7' style='fill:%23ffffff'%3E%3Cg class='fills' id='fills-f73fcbd6-430b-80ec-8006-536f46262c0b-3-0' style='fill:%23ffffff'%3E%3Cpath d='m 343.1,207.451 c 2,-12 -13,-16 -6.418,-22.941 5.838,-6.158 4,-10 10,-17 2.25,-2.625 1.261,-4.176 1.418,-6.059 0.5,-6 13,0.5 13,0.5 0,0 -0.5,-10.5 9.5,-11.5 C 377,143.839 382.5,141 391,145 c 0,0 36,7 36,44 0,18.168 -9,12.5 -9.5,20.5 0,0 15.5,8.5 20.5,27.5 15.5,12.5 21.5,19.5 29.5,33 12.5,7.5 27.5,11.5 39.5,32.5 20.5,9.5 17.128,13.799 29,21.5 18.5,12 13,12.5 14.5,15 1.5,2.5 5,10 0,13 3,6 2.869,8.506 -3.5,14.5 -8.5,8 -27.757,21.057 -15.5,1 5.5,-9 -7.565,-7.219 -10,-15.5 -2.5,-8.5 -7,-14 -7,-14 0,0 -52.5,-14.5 -65,-34.5 -6.5,-13 -15,-18 -15,-18 0,0 -13.5,-5.5 -20.5,-5.5 -7.5,2.5 -29.5,12.945 -29.5,22 0,7 1.5,12 -5,21 -3.5,-2 1.5,13.5 -7.5,14.5 -1.5,9 1.297,6.987 1,13 -2,40.5 -2.296,66.88 -12.5,80 -14,18 -21.49,21.133 -34.5,22 -15,1 -19.5,27 -28,48.5 -1.676,4.24 -5.5,9 0.5,20 3.599,3.638 15.208,5.536 24.5,11.5 33.5,21.5 57.162,83.864 63,91 3,-1 1.598,-2.804 4,-1 4.585,3.444 3.977,10.313 7.5,20 2,5.5 17.274,1.263 24.5,11.5 12,17 2.784,19.048 8,42 5,22 6,43 -12,62 -16.056,16.948 -25,-2 -27,-11 -4,-18 -4,-42 -6,-45 -2,-3 -4,-3 -8,-14 -0.969,-2.664 1,-7.5 -2.5,-12 -6.005,-7.721 -9.453,-17.68 -14,-24.5 -6,-9 -33.5,-41.5 -42.5,-48.5 -9,-7 -16.449,-18.487 -28,-31 -12,-13 -20.047,-21.268 -30,-25 -8,-3 -21,-9 -21,-32 0,-23 8,-48 11,-69 -14,-3 -62,-11 -69,-10 -7,1 2.195,25.359 -39,60 -22,18.5 -44,51 -49,66 -1.703,5.109 -9,14 -21,5 -12,-9 -13,-20 -28,-26 -15,-6 -29.5,-22 -29.5,-28 0,-6 16.131,-6.148 31.5,0 12.5,5 20,-1.5 25,-3.5 1.914,-0.766 7.5,2.5 13,-1.5 9.051,-6.583 22.637,-27.713 38,-53.5 14,-23.5 19,-27.5 21,-33.5 6.107,-18.322 1,-31 27,-34 15.926,-1.838 34.5,-4 44,-8 -4,-15 45.5,-1 50,-5 14.836,-13.187 18,-46 23,-72 1.58,-8.217 9,-57 16,-58 -2,-10 3,-10.75 5,-11 -6.5,-27 -14,-35 -17.5,-47.5 -8,-14 -23,-16.5 -19,-54.5 -7.5,-16.5 -11,-11.5 -15,-16.5 -4,-5 -14.5,-15 -16.5,-23 -2,-8 4.5,-12.5 13,-11.5 5.5,-9 17,5 18,12 1,7 15,18 14,22 -0.617,2.469 13.876,19.3 21,33 4.418,8.498 5,12 6,21 5,5 11,22 13,25 8,-4 18.1,14.451 18.1,14.451 z' style='fill:%23ffffff;fill-opacity:1' id='path4-2-9' /%3E%3C/g%3E%3C/g%3E%3Cg id='shape-f73fcbd6-430b-80ec-8006-53707bbdc86a-0-3' style='fill:%23ffffff'%3E%3Cg class='fills' id='fills-f73fcbd6-430b-80ec-8006-53707bbdc86a-6-6' style='fill:%23ffffff'%3E%3Cpath d='m 400.449,11 c 0,0 112.659,24.987 114.051,84.957 1.425,61.398 -74.815,59.256 -84.79,19.99 -3.686,-14.509 0.712,-32.127 0.712,-32.127 3.763,0.29 12.113,0.714 17.101,0 1.57,-8.126 4.941,-30.698 1.378,-38.552 C 442.55,31.268 418.5,26 406.15,23.851 394.901,21.893 400.449,11 400.449,11 Z' style='fill:%23ffffff;fill-opacity:1' id='path5-1-0' /%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A"
        /> */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_SERVER_URL}
            src={process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL}
          ></script>
        )}
      </head>
      <body>
        <Providers>
          <div className="prose">
            {/* <ScrollArea className="h-screen w-screen"> */}
            <LivePreviewListener />
            <Header locale={locale} show={!pathname.includes('under-construction')} />
            {children}
            {/* <Footer locale={locale} show={!pathname.includes('under-construction')} /> */}
            <Prerenderer numberOfCards={4} />
            {/* </ScrollArea> */}
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
