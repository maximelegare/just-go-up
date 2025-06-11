import type { Access } from 'payload'

import { checkRole } from '../../Users/checkRole'

export const superOrAdminsOrPublished: Access = ({ req: { user } }) => {
  if (checkRole(['super'], user)) {
    return true
  }

  if (checkRole(['admin'], user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
