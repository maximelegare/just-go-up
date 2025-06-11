import type { AccessArgs } from 'payload'

import { checkRole } from '@app/payload/collections/Users/checkRole'

type isSuper = (args: AccessArgs<unknown>) => boolean

export const superUser: isSuper = ({ req: { user } }) => {
  return checkRole(['super'], user)
}
