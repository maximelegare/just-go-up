import type { GlobalConfig } from "payload"

import switchField from "@app/payload/fields/switch/config"

export const Settings: GlobalConfig = {
  slug: "settings",
  typescript: {
    interface: "Settings",
  },
  graphQL: {
    name: "Settings",
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    switchField({
      label: "Under Construction",
      name: "underConstruction",
    }),
    switchField({
      label: "Cookie Manager",
      name: "showCookieManager",
    }),
    switchField({
      label: "Locale Switcher",
      name: "showLocaleSwitcher",
    }),
  ],
}
