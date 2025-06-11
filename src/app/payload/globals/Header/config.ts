import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

import { menusWithSections } from '@app/payload/fields/menusWithSections'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [menusWithSections(6)],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
