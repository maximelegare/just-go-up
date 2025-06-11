import { Admin } from '@app/payload/payload-core-types'
import deepMerge from '@app/utilities/deepMerge'
import { Field } from 'payload'
// import { InputField } from './InputField'

type SwitchType = (options: {
  name: string
  label: string
  defaultValue?: boolean
  overrides?: Partial<Field>
  admin?: Admin
}) => Field

const switchField: SwitchType = ({ name, label, defaultValue, overrides = {}, admin }) => {
  const switchField: Field = {
    name: name,
    label: label,
    type: 'checkbox',
    defaultValue: defaultValue || undefined,
    admin: {
      ...admin,
      components: {
        Field: {
          path: 'src/app/payload/fields/switch/InputField#InputField',
          clientProps: {
            label,
          },
        },
      },
    },
  }
  return deepMerge(switchField, overrides)
}

export default switchField
