import { ItemsListBlock } from "@app/blocks/layouts/ItemsListBlock/config"
import { TitleSectionBlock } from "@app/blocks/layouts/TitleSectionBlock/config"
import type { GlobalConfig } from "payload"

export const Sidebars: GlobalConfig = {
  slug: "sidebars",
  typescript: {
    interface: "Sidebars",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "right",
      type: "group",
      fields: [
        {
          name: "sections",
          type: "blocks",
          blocks: [ItemsListBlock, TitleSectionBlock],
        },
      ],
    },
  ],
}
