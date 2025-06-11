import { getCachedGlobal } from '@app/utilities/getGlobals'
import React from 'react'
import { GetInTouch, Header } from '@payload-types'
import { Locale } from 'ROOT/locales/locales'
import { NavigationMenuClient } from './index.client'

export const NavigationMenu: React.FC<{ locale: Locale }> = async ({ locale }) => {
  const header: Header = await getCachedGlobal('header', 2, locale)()
  const getInTouch: GetInTouch = await getCachedGlobal('getInTouch', 2, locale)()

  return <NavigationMenuClient header={header} getInTouch={getInTouch} />
}
