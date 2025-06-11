import type { Field } from 'payload'
import deepMerge from '@app/utilities/deepMerge'

type RenderBlockConditionally = (overrides?: Partial<Field>) => Field

export const conditionalRenderer: RenderBlockConditionally = (overrides = {}) => {
  const result: Field = {
    name: 'conditionalRenderer',
    type: 'group',
    fields: [
      {
        name: 'show',
        type: 'radio',
        defaultValue: 'always',
        options: [
          { label: 'Always', value: 'always' },
          { label: 'Conditionally', value: 'conditionally' },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'showParams',
            type: 'relationship',
            relationTo: 'search-param-values',
            hasMany: true,
            admin: {
              condition: (_, siblingData) => siblingData.show === 'conditionally',
              width: '50%',
            },
          },
          {
            name: 'hideParams',
            type: 'relationship',
            relationTo: 'search-param-values',
            hasMany: true,
            admin: {
              condition: (_, siblingData) => siblingData.show === 'conditionally',
              width: '50%',
            },
          },
        ],
      },
    ],
  }

  return deepMerge<Field, Partial<Field>>(result, overrides)
}
