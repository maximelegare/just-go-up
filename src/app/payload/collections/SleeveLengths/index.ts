import type { CollectionConfig } from 'payload'

import { anyone } from '../../../access/anyone'
import { admins } from '@app/access/admins'

export const SleeveLengths: CollectionConfig = {
  slug: 'sleeve-lengths',
  typescript: {
    interface: 'SleeveLength',
  },
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      localized: true,
      type: 'text',
    },
  ],
}
