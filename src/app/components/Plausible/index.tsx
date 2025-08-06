"use client"

import Script from "next/script"
import React, { useEffect, useState } from "react"

type PlausibleType = {
  disableAnalytics: boolean
}

const excludedOrigins = ["http://localhost:3000", "https://dev.justgoup.blog"]

export const Plausible: React.FC<PlausibleType> = ({ disableAnalytics }) => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const origin = window.location.origin
    const isExcluded = excludedOrigins.includes(origin)

    if (!isExcluded && !disableAnalytics) {
      setShouldRender(true)
    }
  }, [disableAnalytics])

  if (!shouldRender) return null

  return (
    <Script
      defer
      data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  )
}

{
  /* <script defer data-domain="dev.justgoup.blog" src="https://plausible.io/js/script.js"></script> */
}
