"use client"
import { useEffect } from "react"
import { useCookieConsent } from "react-cookie-manager"
import { doesCookieExist } from "@app/utilities/checkCookie"

export default function CookieManager() {
  const { showConsentBanner } = useCookieConsent()

  const checkMyCookie = async () => {
    const exists = doesCookieExist("cookie-consent")
    if (!exists) showConsentBanner()
  }

  useEffect(() => {
    checkMyCookie()
  }, [])

  return null
}
