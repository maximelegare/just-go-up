import { FieldHook } from 'payload'

const autoFillField =
  (fieldToUse: string): FieldHook =>
  ({ data, value }) => {
    if (typeof value === 'string') {
      return value
    }
    if (typeof data[fieldToUse] === 'string') {
      return data[fieldToUse]
    }
  }
export { autoFillField }
