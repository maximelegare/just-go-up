import type { Block, Field } from "payload"

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

import { link } from "@app/payload/fields/link"
import switchField from "@app/payload/fields/switch/config"

import { conditionalRenderer } from "@app/payload/fields/conditionalBlockRenderer"
import { gutterField } from "@app/payload/fields/gutter"

const columnFields: Field[] = [
  {
    name: "size",
    type: "select",
    defaultValue: "oneThird",
    options: [
      {
        label: "One Third",
        value: "oneThird",
      },
      {
        label: "Half",
        value: "half",
      },
      {
        label: "Two Thirds",
        value: "twoThirds",
      },
      {
        label: "Full",
        value: "full",
      },
    ],
  },
  {
    name: "richText",
    type: "richText",
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h3", "h4", "h5"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: "enableLink",
    type: "checkbox",
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

const singleColumnFields: Field[] = [
  {
    name: "richText",
    type: "richText",
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4", "h5"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: "enableLink",
    type: "checkbox",
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: "content",

  fields: [
    switchField({
      name: "hasMultipleColumns",
      label: "Multiple Columns",
      defaultValue: true,
    }),
    {
      name: "columns",
      type: "array",
      fields: columnFields,
      admin: {
        condition: (_, { hasMultipleColumns }) => Boolean(hasMultipleColumns),
      },
    },
    {
      name: "column",
      type: "group",
      fields: singleColumnFields,
      admin: {
        condition: (_, { hasMultipleColumns }) => Boolean(!hasMultipleColumns),
      },
    },
    gutterField(),
    conditionalRenderer(),
  ],
}
