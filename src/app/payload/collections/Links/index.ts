import type { CollectionConfig } from 'payload'

import { anyone } from '../../../access/anyone'
import { admins } from '@app/access/admins'
import { link } from '@app/payload/fields/link'

export const Links: CollectionConfig = {
  slug: 'links',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    link(),
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
