import type { GlobalConfig } from "payload"

import { revalidateHeader } from "./hooks/revalidateHeader"

import { menusWithSections } from "@app/payload/fields/menusWithSections"
import switchField from "@app/payload/fields/switch/config"

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  fields: [
    menusWithSections(6),
    switchField({
      label: "Show Locale Switcher",
      name: "showLocaleSwitcher",
      admin: {
        position: "sidebar",
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
