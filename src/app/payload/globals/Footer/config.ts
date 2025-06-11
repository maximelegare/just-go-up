import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'section',
          localized: true,
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'relationship',
          relationTo: 'links',
          hasMany: true,
        },
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
