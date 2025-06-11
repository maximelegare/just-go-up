import type { CollectionConfig } from 'payload'

import { superUser } from '@app/access/super'
import { slugField } from '@app/payload/fields/slug'
import { anyone } from '@app/access/anyone'

export const SearchParamKeys: CollectionConfig = {
  slug: 'search-param-keys',
  access: {
    create: superUser,
    delete: superUser,
    read: anyone,
    update: superUser,
  },
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    slugField('title', {
      admin: {
        position: null,
      },
    }),
  ],
}
