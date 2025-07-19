import type { CollectionConfig } from "payload"

import { Content } from "../../../blocks/layouts/Content/config"
import { MediaBlock } from "../../../blocks/layouts/MediaBlock/config"
import { slugField } from "@app/payload/fields/slug"
import switchField from "@app/payload/fields/switch/config"
import { admins } from "@app/access/admins"
import { anyone } from "@app/access/anyone"
import { TitleSectionBlock } from "@app/blocks/layouts/TitleSectionBlock/config"
// import { beforeChangeVariant } from './hooks/beforeChange'
// import { checkUserPurchases } from './access/checkUserPurchases'
// import { beforeProductChange } from './hooks/beforeChange'
// import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
// import { revalidateProduct } from './hooks/revalidateProduct'
// import { ProductSelect } from './ui/ProductSelect'

export const Blogs: CollectionConfig = {
  slug: "blogs",
  // hooks: {
  //   beforeChange: [beforeChangeVariant]
  // },
  admin: {
    useAsTitle: "slug",
    // preview: (doc) => {
    //   return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
    //     `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
    //   )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    // },
  },
  // hooks: {
  //   beforeChange: [beforeProductChange],
  //   afterChange: [revalidateProduct],
  //   // afterDelete: [deleteProductFromCarts],
  // },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
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
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "title",
              localized: true,
              type: "text",
            },
            {
              name: "subtitle",
              type: "text",
              localized: true,
            },
            {
              name: "categories",
              type: "relationship",
              relationTo: "categories",
              hasMany: true,
            },
          ],
        },
        {
          name: "content",
          label: "Content",
          fields: [
            {
              name: "content",
              type: "blocks",
              localized: true,
              required: true,
              blocks: [Content, MediaBlock, TitleSectionBlock],
            },
          ],
        },
        {
          name: "medias",
          label: "Images",
          fields: [{ name: "mainImage", type: "upload", relationTo: "media" }],
        },
      ],
    },
    switchField({
      label: "Is featured",
      name: "isFeatured",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    }),
    switchField({
      label: "Is Active",
      name: "isActive",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    }),
    slugField("title", { admin: { position: "sidebar" } }),
    {
      name: "skipSync",
      label: "Skip Sync",
      type: "checkbox",
      admin: {
        position: "sidebar",
        readOnly: true,
        hidden: true,
      },
    },
  ],
}
