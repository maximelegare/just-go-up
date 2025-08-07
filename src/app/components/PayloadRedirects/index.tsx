import type React from "react"
import type { Page } from "src/payload-types"

import { getCachedDocument } from "@app/utilities/getDocument"
import { getCachedRedirects } from "@app/utilities/getRedirects"
import { notFound, redirect } from "next/navigation"
import { Locale } from "ROOT/locales/locales"

interface Props {
  disableNotFound?: boolean
  url: string
  locale: Locale
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url, locale }) => {
  const slug = url.startsWith("/") ? url : `${url}`

  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === slug)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === "string") {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id, locale)()) as Page
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== "pages" ? `/${redirectItem.to?.reference?.relationTo}` : ""}/${
        document?.slug
      }`
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== "pages" ? `/${redirectItem.to?.reference?.relationTo}` : ""}/${
        redirectItem.to?.reference?.value?.slug
      }`
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null
  return notFound()
}
