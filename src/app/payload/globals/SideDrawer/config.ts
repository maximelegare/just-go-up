import type { GlobalConfig } from 'payload'

export const SideDrawer: GlobalConfig = {
  slug: 'sideDrawer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sections',
      label: 'Links',
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
