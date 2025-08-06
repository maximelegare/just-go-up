import React from "react"

type PlausibleType = {
  disableAnalytics: boolean
}

const urlsToExclude = ["http://localhost:3000"]

const isExcluded = urlsToExclude.includes(process.env.PAYLOAD_PUBLIC_SERVER_URL!)

export const Plausible: React.FC<PlausibleType> = ({ disableAnalytics }) => {
  if (isExcluded || disableAnalytics) return null

  return (
    <script
      defer
      data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
      data-api="/api/event"
      src="/js/script.js"
    />
  )
}
