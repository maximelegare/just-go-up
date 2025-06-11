import type { Block } from 'payload'

export const ItemDetailsLayout: Block = {
  slug: 'itemDetails',
  fields: [
    {
      name: 'blockTitle',
      label: 'Title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'relationTo',
      type: 'select',
      defaultValue: 'products',
      label: 'Collection to Show',
      options: [
        {
          label: 'Products',
          value: 'products',
        },
        {
          label: 'Categories',
          value: 'categories',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'categories',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'products',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'products',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'products',
    },
  ],
}
