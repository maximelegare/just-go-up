import { getCachedGlobal } from "@app/utilities/getGlobals"
import React from "react"
import { GetInTouch, Header } from "@payload-types"
import { Locale } from "ROOT/locales/locales"
import { NavigationMenuClient } from "./index.client"

export const NavigationMenu: React.FC<{ locale: Locale; header: Header }> = async ({
  locale,
  header,
}) => {
  const getInTouch: GetInTouch = await getCachedGlobal("getInTouch", 2, locale)()

  return <NavigationMenuClient header={header} getInTouch={getInTouch} />
}
