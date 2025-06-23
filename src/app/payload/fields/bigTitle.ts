import type { Field } from 'payload'
import { link } from './link'
import switchField from './switch/config'
import { autoFillField } from '@app/utilities/autoFillField'
import deepMerge from '@app/utilities/deepMerge'

type BigTitle = (fieldToUse?: string, overrides?: Partial<Field>) => Field

export const bigTitle: BigTitle = (fieldToUse = 'title', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'bigTitle',
      type: 'group',
      fields: [
        switchField({
          name: 'enable',
          defaultValue: false,
          label: 'Enable',
        }),
        {
          name: 'title',
          type: 'text',
          localized: true,
          hooks: {
            beforeValidate: [autoFillField(fieldToUse)],
          },
          admin: {
            condition: (_, { enable }) => Boolean(enable),
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
          admin: {
            condition: (_, { enable }) => Boolean(enable),
          },
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (_, { enable }) => Boolean(enable),
          },
        },
        link({
          overrides: {
            admin: {
              condition: (_, { enableLink }) => Boolean(enableLink),
            },
          },
        }),
      ],
    },
    overrides,
  )
