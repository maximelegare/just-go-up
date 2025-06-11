import type { GlobalConfig } from 'payload'

export const Sidebar: GlobalConfig = {
  slug: 'sidebar',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sidebarSections',
      label: 'Sidebar links',
      type: 'array',
      fields: [
        {
          type: 'relationship',
          relationTo: 'links',
          hasMany: true,
          name: 'links',
        },
      ],
    },
  ],
}
