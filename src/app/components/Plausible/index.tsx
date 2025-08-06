import Script from "next/script"
import React from "react"

type PlausibleType = {
  disableAnalytics: boolean
  disablePageAnalytics: boolean
}

const urlsToExclude = ["http://localhost:3000"]

const isExcluded = urlsToExclude.includes(process.env.PAYLOAD_PUBLIC_SERVER_URL!)

export const Plausible: React.FC<PlausibleType> = ({ disableAnalytics, disablePageAnalytics }) => {
  if (isExcluded || disableAnalytics || disablePageAnalytics) return null

  return (
    <Script
      defer
      data-domain={process.env.PAYLOAD_PUBLIC_SERVER_URL}
      data-api="/api/event"
      src="/js/script.js"
      strategy="afterInteractive"
    />
  )
}
