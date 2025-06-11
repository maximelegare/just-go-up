import { Condition, Description } from 'payload'

export type Admin = {
  position?: 'sidebar'
  width?: string
  className?: string
  readOnly?: boolean
  disabled?: boolean
  condition?: Condition
  description?: Description
  components?: {
    Filter?: React.ComponentType<any>
    Cell?: React.ComponentType<any>
    Field?: React.ComponentType<any>
  }
  disableBulkEdit?: boolean
  hidden?: boolean
}
