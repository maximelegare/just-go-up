import type { CollectionConfig } from "payload"
import { CallToAction } from "../../../blocks/layouts/CallToAction/config"
import { Content } from "../../../blocks/layouts/Content/config"
import { MediaBlock } from "../../../blocks/layouts/MediaBlock/config"
import { FormBlock } from "../../../blocks/layouts/Form/config"
import { hero } from "@app/heros/config"

import { revalidatePage } from "./hooks/revalidatePage"
import { ItemsListBlock } from "@app/blocks/layouts/ItemsListBlock/config"
import { superUser } from "@app/access/super"
import { admins } from "@app/access/admins"
import { anyone } from "@app/access/anyone"
import { slugField } from "@app/payload/fields/slug"
import { DynamicContent } from "@app/blocks/layouts/DynamicContent/config"
import switchField from "@app/payload/fields/switch/config"
import { TitleSectionBlock } from "@app/blocks/layouts/TitleSectionBlock/config"

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== "home" ? doc.slug : ""}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
    update: admins,
    create: superUser,
    delete: superUser,
  },
  fields: [
    {
      name: "title",
      localized: true,
      type: "text",
      required: true,
    },
    {
      name: "publishedOn",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: "globalsToShow",
      type: "group",
      fields: [
        switchField({
          label: "Right Sidebar",
          name: "rightSidebar",
          admin: {
            position: "sidebar",
          },
        }),
        switchField({
          label: "Footer",
          name: "footer",
          admin: {
            position: "sidebar",
          },
        }),
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [hero],
        },
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              localized: true,
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                FormBlock,
                ItemsListBlock,
                DynamicContent,
                TitleSectionBlock,
              ],
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
