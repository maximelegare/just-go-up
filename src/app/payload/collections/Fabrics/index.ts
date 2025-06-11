import type { CollectionConfig } from 'payload'

import { anyone } from '@app/access/anyone'
import { admins } from '@app/access/admins'
import { slugField } from '@app/payload/fields/slug'

export const Fabrics: CollectionConfig = {
  slug: 'fabrics',
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
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'SKU',
      type: 'text',
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
