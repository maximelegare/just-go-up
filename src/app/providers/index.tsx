import React from "react"

import { PrerendererProvider } from "@app/components/Prerenderer"
import { CookieMangerProvider } from "./CookieManager"

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <CookieMangerProvider>
      <PrerendererProvider>{children}</PrerendererProvider>
    </CookieMangerProvider>
  )
}
