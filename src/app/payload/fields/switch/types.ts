import { Admin } from '@app/payload/payload-core-types'
import { FieldBase } from 'payload'

export type SwicthField = FieldBase & {
  type: 'checkbox'
  defaultValue?: boolean
  path?: string
  inputRef?: React.MutableRefObject<HTMLInputElement>
  admin?: Admin & {
    placeholder?: Record<string, string> | string
    autoComplete?: string
  }
}
