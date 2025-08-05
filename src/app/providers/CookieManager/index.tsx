"use client"
import dynamic from "next/dynamic"

const CookieManager = dynamic(
  () => import("react-cookie-manager").then((mod) => mod.CookieManager),
  { ssr: true, loading: () => null },
)

export const CookieMangerProvider = ({
  children,
  showCookieManager,
}: {
  children: React.ReactNode
  showCookieManager: boolean
}) => {
  if (!showCookieManager) return children

  return (
    <CookieManager
      disableAutomaticBlocking
      classNames={{
        popupContainer:
          "shadow-lg fixed z-[200] w-64 ml-2 mb-2 bottom-0 bg-background border-border rounded-xl border-2",
        manageButton: "hidden",
        // acceptButton:"bg-accent"
      }}
      translations={{
        title: "Would You Like A Cookie? 🍪",
        message:
          "We value your privacy. You can either accept all cookies or decline them all. Essential cookies are always enabled as they are necessary for the website to function properly.",
        buttonText: "Accept All",
        declineButtonText: "Decline All",
        privacyPolicyText: "Privacy Policy",
      }}
      privacyPolicyUrl="https://example.com/privacy"
      theme="light"
      displayType="popup"
      onAccept={() => {
        // Initialize GA after consent
        // @ts-ignore
        window.gtag?.("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)
      }}
    >
      {children}
    </CookieManager>
  )
}
