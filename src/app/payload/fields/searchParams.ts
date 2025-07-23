import type { Field } from "payload"
import deepMerge from "@app/utilities/deepMerge"

type RenderBlockConditionally = (overrides?: Partial<Field>) => Field

export const searchParams: RenderBlockConditionally = (overrides = {}) => {
  const result: Field = {
    name: "searchParams",
    label: "Search params",
    type: "group",
    fields: [
      {
        name: "toggleOnClick",
        type: "checkbox",
        defaultValue: false,
      },
      {
        name: "params",
        type: "array",
        fields: [
          {
            name: "key",
            type: "relationship",
            relationTo: "search-param-keys",
            required: true,
          },
          {
            name: "value",
            type: "group",
            fields: [
              {
                name: "valueType",
                defaultValue: "collection",
                type: "radio",
                options: [
                  { label: "Collection", value: "collection" },
                  { label: "Custom", value: "custom" },
                ],
              },
              {
                name: "collectionData",
                type: "group",
                admin: {
                  condition: (_, siblingData) => siblingData.valueType === "collection",
                },
                fields: [
                  {
                    name: "type",
                    type: "select",
                    options: [
                      { label: "Category", value: "category" },
                      { label: "Blog", value: "blog" },
                    ],
                  },
                  {
                    name: "category",
                    type: "relationship",
                    relationTo: "categories",
                    admin: {
                      condition: (_, siblingData) => siblingData?.type === "category",
                    },
                    required: true,
                  },
                  {
                    name: "blog",
                    type: "relationship",
                    relationTo: "blogs",
                    admin: {
                      condition: (_, siblingData) => siblingData?.type === "fabric",
                    },
                    required: true,
                  },
                ],
              },
              {
                name: "custom",
                type: "group",
                fields: [
                  {
                    name: "value",
                    type: "relationship",
                    relationTo: "search-param-values",
                  },
                ],
                admin: {
                  condition: (_, siblingData) => siblingData?.valueType === "custom",
                },
              },
            ],
          },
        ],
      },
    ],
  }

  return deepMerge<Field, Partial<Field>>(result, overrides)
}
