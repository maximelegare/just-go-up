import type { CollectionConfig } from 'payload'

import { anyone } from '@app/access/anyone'
import { superUser } from '@app/access/super'
import { admins } from '@app/access/admins'
import { slugField } from '@app/payload/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admins,
    delete: superUser,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    slugField(),
  ],
}
