import type { GlobalConfig } from 'payload'

import switchField from '@app/payload/fields/switch/config'
import { link } from '@app/payload/fields/link'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    switchField({
      label: 'Under Construction',
      name: 'underConstruction',
    }),
    {
      name: 'sidebarLinks',
      label: '',
      type: 'array',
      fields: [
        link({
          overrides: {
            admins: {
              require: true,
            },
          },
        }),
      ],
    },
  ],
}
