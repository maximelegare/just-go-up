import React from "react"

import { PrerendererProvider } from "@app/components/Prerenderer"
import { CookieMangerProvider } from "./CookieManager"

export const Providers: React.FC<{
  children: React.ReactNode
  showCookieManager: boolean
}> = ({ children, showCookieManager }) => {
  return (
    <CookieMangerProvider showCookieManager={showCookieManager}>
      <PrerendererProvider>{children}</PrerendererProvider>
    </CookieMangerProvider>
  )
}
