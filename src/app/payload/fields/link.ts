import type { Field } from "payload"

import deepMerge from "@app/utilities/deepMerge"
import { buttonVariant } from "@app/components/ui/button"
import { searchParams } from "./searchParams"
import switchField from "./switch/config"

export type LinkAppearances = keyof typeof buttonVariant

export const appearanceOptions = Object.keys(buttonVariant).reduce<
  Record<LinkAppearances, { label: string; value: string }>
>(
  (acc, val) => {
    acc[val] = {
      label: `${val[0].toUpperCase()}${val.slice(1)}`,
      value: val,
    }
    return acc
  },
  {} as Record<LinkAppearances, { label: string; value: string }>,
)

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "type",
            type: "radio",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
            defaultValue: "reference",
            options: [
              {
                label: "Internal link",
                value: "reference",
              },
              {
                label: "Custom URL",
                value: "custom",
              },
              {
                label: "Current URL",
                value: "current",
              },
            ],
          },
          {
            name: "newTab",
            type: "checkbox",
            admin: {
              style: {
                alignSelf: "flex-end",
              },
              width: "50%",
            },
            label: "Open in new tab",
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: "reference",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
      },
      label: "Document to link to",
      relationTo: ["pages"],
      required: true,
    },
    {
      name: "url",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      label: "Custom URL",
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: "50%",
      },
    }))

    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          localized: true,
          type: "text",
          label: "Label",
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = Object.values(appearanceOptions)

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push(
      {
        name: "appearance",
        type: "select",
        admin: {
          description: "Dictates how the link should be rendered.",
        },
        defaultValue: "default",
        options: appearanceOptionsToUse,
      },
      {
        name: "isActive",
        type: "select",
        defaultValue: "default",
        admin: {
          description: "Highlights the link based on the URL",
        },
        options: [
          { value: "default", label: "Default" },
          { value: "exact", label: "Exact" },
          { value: "never", label: "Never" },
        ],
      },
      searchParams(),
      switchField({
        label: "isSheet",
        name: "isSheet",
      }),
    )
  }
  return deepMerge(linkResult, overrides)
}
