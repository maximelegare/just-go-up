// @ts-nocheck

import canUseDOM from "./canUseDOM"

export const useGoogleAnalytics = () => {
  const enableAnalytics = () => {
    if (!canUseDOM) return

    window.dataLayer = window.dataLayer || []

    function gtag() {
      dataLayer.push(arguments)
    }
    gtag("js", new Date())
    gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)
  }
  return {
    enableAnalytics,
  }
}
