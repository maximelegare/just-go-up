import type { Block } from "payload"
import { autoFillField } from "@app/utilities/autoFillField"
import switchField from "@app/payload/fields/switch/config"
import { link } from "@app/payload/fields/link"
import { titlesComponentsMap } from "@app/_Map/titles.map"

type TitleType = keyof typeof titlesComponentsMap

const titles: Array<TitleType> = ["highImpact", "lowImpact"]

export const TitleSectionBlock: Block = {
  slug: "titleSection",
  fields: [
    {
      type: "select",
      name: "type",
      options: titles,
      defaultValue: "highImpact",
    },
    {
      name: "title",
      type: "text",
      localized: true,
      // hooks: {
      //   beforeValidate: [autoFillField(fieldToUse)],
      // },
    },
    {
      name: "subtitle",
      type: "text",
      localized: true,
      // hooks: {
      //   beforeValidate: [autoFillField("subtitle")],
      // },
    },
    switchField({
      label: "Show Image",
      name: "showImage",
      admin: { condition: (_, { type }) => type === "highImpact" },
    }),
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      hooks: {
        beforeValidate: [autoFillField("mainImage")],
      },
      admin: {
        condition: (_, { showImage }) => Boolean(showImage),
      },
    },
    switchField({
      label: "Enable Link",
      name: "enableLink",
      admin: { condition: (_, { type }) => type === "highImpact" },
    }),
    link({
      overrides: {
        admin: {
          condition: (_, { enableLink }) => Boolean(enableLink),
        },
      },
    }),
  ],
}
