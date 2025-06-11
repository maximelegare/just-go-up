import type { AccessArgs } from 'payload'

import { checkRole } from '@app/payload/collections/Users/checkRole'

type isAdmin = (args: AccessArgs<unknown>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}
