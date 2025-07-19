import { bigTitle } from "@app/payload/fields/bigTitle"
import { conditionalRenderer } from "@app/payload/fields/conditionalBlockRenderer"
import { optionsBar } from "@app/payload/fields/optionsBar"
import switchField from "@app/payload/fields/switch/config"
import { capitalize } from "@app/utilities/strings/catpitalize"
import type { Block } from "payload"

import { cardComponentsMap } from "@app/_Map/cards.map"

export type CardVariant = keyof typeof cardComponentsMap
const cardVariants: Array<CardVariant> = [
  "product",
  "category",
  "variant",
  "blog",
  "blog-condensed",
] as const

export const ItemsListBlock: Block = {
  slug: "itemsList",
  fields: [
    bigTitle(),
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
      ],
    },
    {
      name: "relationTo",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
      },
      type: "select",
      defaultValue: "products",
      label: "Collection to Show",
      options: [
        {
          label: "Products",
          value: "products",
        },
        {
          label: "Categories",
          value: "categories",
        },
        {
          label: "Variants",
          value: "variants",
        },
        {
          label: "Blogs",
          value: "blogs",
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
      name: "featured",
      type: "group",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "featured",
      },
      fields: [
        {
          name: "relationTo",
          type: "select",
          defaultValue: "products",
          label: "Collection to Show",
          options: [
            {
              label: "Products",
              value: "products",
            },
            {
              label: "Categories",
              value: "categories",
            },
            {
              label: "Variants",
              value: "variants",
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
        {
          name: "products",
          type: "relationship",
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === "products",
          },
          hasMany: true,
          label: "Products To Show",
          relationTo: "products",
        },
        {
          name: "variants",
          type: "relationship",
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === "variants",
          },
          hasMany: true,
          label: "Variants to Show",
          relationTo: "variants",
        },
        {
          name: "blogs",
          type: "relationship",
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === "variants",
          },
          hasMany: true,
          label: "Variants to Show",
          relationTo: "variants",
        },
      ],
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
        condition: (_, siblingData) => siblingData.layout === "grid",
      },
    }),
    conditionalRenderer(),
  ],
  labels: {
    plural: "Items lists",
    singular: "Items list",
  },
}
