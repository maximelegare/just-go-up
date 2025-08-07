import type { Field } from "payload"

import deepMerge from "@app/utilities/deepMerge"
import formatSlug from "@app/utilities/formatSlug"

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

import { gutterOptions } from "@app/components/Gutter"
import { capitalize } from "@app/utilities/strings/catpitalize"

const options = Object.keys(gutterOptions).map((el) => ({ label: capitalize(el), value: el }))

export const gutterField: Slug = (fieldToUse = "title", overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: "gutter",
      type: "select",
      admin: {
        position: "sidebar",
      },
      required: true,
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
      label: "Gutter",
      defaultValue: "none",
      options: options,
    },
    overrides,
  )
