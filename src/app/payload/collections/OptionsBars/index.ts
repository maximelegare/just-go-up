import type { CollectionConfig } from 'payload'

import { anyone } from '@app/access/anyone'
import { admins } from '@app/access/admins'
import { slugField } from '@app/payload/fields/slug'
import { menusWithSections } from '@app/payload/fields/menusWithSections'

export const OptionsBars: CollectionConfig = {
  slug: 'optionsBars',
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: 'slug',
  },

  fields: [menusWithSections(), slugField()],
}
