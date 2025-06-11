import { bigTitle } from '@app/payload/fields/bigTitle'
import { conditionalRenderer } from '@app/payload/fields/conditionalBlockRenderer'
import { optionsBar } from '@app/payload/fields/optionsBar'
import type { Block } from 'payload'

export const ItemsListBlock: Block = {
  slug: 'itemsList',
  fields: [
    bigTitle(),
    optionsBar(),
    {
      name: 'blockTitle',
      label: 'Title',
      type: 'text',
      localized: true,
      required: true,
    },

    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      required: true,
      options: [
        {
          label: 'Whole Collection',
          value: 'collection',
        },
        {
          label: 'Featured',
          value: 'featured',
        },
      ],
    },
    {
      name: 'relationTo',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
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
        {
          label: 'Variants',
          value: 'variants',
        },
      ],
    },
    {
      name: 'featured',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'featured',
      },
      fields: [
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
            {
              label: 'Variants',
              value: 'variants',
            },
          ],
        },
        {
          name: 'categories',
          type: 'relationship',
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === 'categories',
          },
          hasMany: true,
          label: 'Categories to show',
          relationTo: 'categories',
        },
        {
          name: 'products',
          type: 'relationship',
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === 'products',
          },
          hasMany: true,
          label: 'Products To Show',
          relationTo: 'products',
        },
        {
          name: 'variants',
          type: 'relationship',
          admin: {
            condition: (_, siblingData) => siblingData.relationTo === 'variants',
          },
          hasMany: true,
          label: 'Variants to Show',
          relationTo: 'variants',
        },
      ],
    },
    {
      name: 'layout',
      type: 'radio',
      defaultValue: 'carousel',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'Horizontal Scroll', value: 'horizontalScroll' },
      ],
    },
    {
      name: 'imageSelector',
      type: 'select',
      options: [
        { label: 'Images', value: 'images' },
        { label: 'Dots', value: 'dots' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'carousel',
      },
    },
    // switchField({
    //   label: 'Has limit',
    //   name: 'hasLimit',
    //   defaultValue: false,
    // }),
    {
      name: 'hasPagination',
      type: 'checkbox',
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'grid',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Limit',
    },
    conditionalRenderer(),

    // {
    //     name: 'limit',
    //     type: 'number',
    //     defaultValue: 10,
    //     label: 'Limit',
    // },
  ],
  labels: {
    plural: 'Items lists',
    singular: 'Items list',
  },
}
