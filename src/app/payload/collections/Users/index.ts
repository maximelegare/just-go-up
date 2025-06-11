import type { CollectionConfig, Option } from 'payload'

import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { checkRole } from './checkRole'
import { superUser } from '@app/access/super'
import { admins } from '@app/access/admins'
import { anyone } from '@app/access/anyone'

const roles: Option[] = [
  {
    label: 'super',
    value: 'super',
  },
  {
    label: 'admin',
    value: 'admin',
  },
  {
    label: 'user',
    value: 'user',
  },
]

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: anyone,
    create: superUser,
    update: admins,
    delete: superUser,
    admin: ({ req: { user } }) => checkRole(['admin', 'super'], user),
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: roles,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: superUser,
        update: superUser,
      },
    },
  ],
  timestamps: true,
}
