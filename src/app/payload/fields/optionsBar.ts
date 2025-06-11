import type { Field } from 'payload'
import deepMerge from '@app/utilities/deepMerge'
import switchField from './switch/config'

type OptionsBar = (overrides?: Partial<Field>) => Field

export const optionsBar: OptionsBar = (overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'optionsBar',
      type: 'group',
      fields: [
        switchField({
          name: 'enable',
          defaultValue: false,
          label: 'Enable',
        }),
        {
          type: 'relationship',
          name: 'data',
          relationTo: 'optionsBars',
          admin: { condition: (_, siblingData) => siblingData.enable === true },
        },
      ],
    },
    overrides,
  )
