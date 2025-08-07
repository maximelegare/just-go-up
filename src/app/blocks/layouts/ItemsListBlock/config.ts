import { conditionalRenderer } from "@app/payload/fields/conditionalBlockRenderer"
import { optionsBar } from "@app/payload/fields/optionsBar"
import switchField from "@app/payload/fields/switch/config"
import { capitalize } from "@app/utilities/strings/catpitalize"
import type { Block } from "payload"

import { cardComponentsMap } from "@app/_Map/cards.map"
import { gutterField } from "@app/payload/fields/gutter"

export type CardVariant = keyof typeof cardComponentsMap
const cardVariants: Array<CardVariant> = [
  "category",
  "blog",
  "blog-condensed",
  "category-label",
  "link",
] as const

export const ItemsListBlock: Block = {
  slug: "itemsList",
  fields: [
    optionsBar(),
    {
      name: "blockTitle",
      label: "Title",
      type: "text",
      localized: true,
      required: true,
    },

    {
      name: "populateBy",
      type: "select",
      defaultValue: "collection",
      required: true,
      options: [
        {
          label: "Whole Collection",
          value: "collection",
        },
        {
          label: "Featured",
          value: "featured",
        },
        {
          label: "Specific List",
          value: "specificList",
        },
      ],
    },
    {
      name: "relationTo",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
      },
      type: "select",
      defaultValue: "blogs",
      label: "Collection to Show",
      options: [
        {
          label: "Categories",
          value: "categories",
        },
        {
          label: "Blogs",
          value: "blogs",
        },
      ],
    },
    {
      name: "featured",
      type: "group",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "featured",
      },
      fields: [
        {
          name: "relationTo",
          type: "select",
          defaultValue: "blogs",
          label: "Collection to Show",
          options: [
            {
              label: "Categories",
              value: "categories",
            },

            {
              label: "Blogs",
              value: "blogs",
            },
          ],
        },
        {
          name: "categories",
          type: "relationship",
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === "categories",
          },
          hasMany: true,
          label: "Categories to show",
          relationTo: "categories",
        },
      ],
    },
    {
      name: "specificList",
      type: "group",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "specificList",
      },
      fields: [
        {
          name: "relationTo",
          type: "select",
          defaultValue: "blogs",
          label: "Collection to Show",
          options: [
            {
              label: "Categories",
              value: "categories",
            },
            {
              label: "Blogs",
              value: "blogs",
            },
            {
              label: "Links",
              value: "links",
            },
          ],
        },
        {
          name: "categories",
          type: "relationship",
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === "categories",
          },
          hasMany: true,
          label: "Categories to show",
          relationTo: "categories",
        },
        {
          name: "blogs",
          type: "relationship",
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === "blogs",
          },
          hasMany: true,
          label: "blogs to show",
          relationTo: "blogs",
        },
        {
          name: "links",
          type: "relationship",
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === "links",
          },
          hasMany: true,
          label: "Links to show",
          relationTo: "links",
        },
      ],
    },
    {
      name: "cardVariant",
      type: "select",
      defaultValue: "blog",
      options: cardVariants.map((el) => ({ label: capitalize(el), value: el })),
    },
    {
      name: "layout",
      type: "radio",
      defaultValue: "carousel",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel", value: "carousel" },
        { label: "Horizontal Scroll", value: "horizontalScroll" },
        { label: "Vertical list", value: "verticalList" },
        { label: "Horizontal Wrap", value: "horizontalWrap" },
      ],
    },
    {
      name: "imageSelector",
      type: "select",
      options: [
        { label: "Images", value: "images" },
        { label: "Dots", value: "dots" },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.layout === "carousel",
      },
    },
    switchField({
      label: "Has limit",
      name: "hasLimit",
      defaultValue: false,
    }),
    {
      name: "limit",
      type: "number",
      label: "Limit",
      admin: {
        condition: (_, siblingData) => siblingData.hasLimit,
      },
    },
    switchField({
      label: "Has Pagination",
      name: "hasPagination",
      defaultValue: false,
      admin: {
        condition: (_, siblingData) =>
          siblingData.layout === "grid" || siblingData.layout === "verticalList",
      },
    }),
    gutterField(),
    conditionalRenderer(),
  ],
  labels: {
    plural: "Items lists",
    singular: "Items list",
  },
}
