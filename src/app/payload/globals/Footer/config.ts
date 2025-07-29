import type { GlobalConfig } from "payload"

import { revalidateFooter } from "./hooks/revalidateFooter"

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "links",
      type: "relationship",
      relationTo: "links",
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
