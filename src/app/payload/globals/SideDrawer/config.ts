import { FormBlock } from "../../../blocks/layouts/Form/config"
import { ItemsListBlock } from "@app/blocks/layouts/ItemsListBlock/config"
import { Content } from "../../../blocks/layouts/Content/config"
import { TitleSectionBlock } from "@app/blocks/layouts/TitleSectionBlock/config"
import type { GlobalConfig } from "payload"

export const SideDrawer: GlobalConfig = {
  slug: "sideDrawer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "header",
      type: "group",
      fields: [],
    },
    {
      name: "body",
      type: "group",
      fields: [
        {
          name: "content",
          type: "group",
          fields: [
            {
              name: "layout",
              type: "blocks",
              localized: true,
              blocks: [Content, FormBlock, ItemsListBlock, TitleSectionBlock],
            },
          ],
        },
      ],
    },
    {
      name: "footer",
      type: "group",
      fields: [],
    },
  ],
}
