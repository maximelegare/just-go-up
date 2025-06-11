import type { CollectionConfig } from 'payload'

import { Content } from '../../../blocks/layouts/Content/config'
import { MediaBlock } from '../../../blocks/layouts/MediaBlock/config'
import { slugField } from '@app/payload/fields/slug'
import switchField from '@app/payload/fields/switch/config'
import { admins } from '@app/access/admins'
import { anyone } from '@app/access/anyone'
// import { beforeChangeVariant } from './hooks/beforeChange'
// import { checkUserPurchases } from './access/checkUserPurchases'
// import { beforeProductChange } from './hooks/beforeChange'
// import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
// import { revalidateProduct } from './hooks/revalidateProduct'
// import { ProductSelect } from './ui/ProductSelect'

export const Variants: CollectionConfig = {
  slug: 'variants',
  // hooks: {
  //   beforeChange: [beforeChangeVariant]
  // },
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['title', 'stripeProductID', '_status'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  // hooks: {
  //   beforeChange: [beforeProductChange],
  //   afterChange: [revalidateProduct],
  //   // afterDelete: [deleteProductFromCarts],
  // },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'products',
              type: 'join',
              collection: 'products',
              on: 'variants',
            },
            {
              name: 'title',
              localized: true,
              type: 'text',
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: false,
            },
            {
              name: 'fabric',
              type: 'relationship',
              relationTo: 'fabrics',
              hasMany: true,
            },
            {
              name: 'length',
              type: 'relationship',
              relationTo: 'sleeve-lengths',
              hasMany: false,
              admin: {
                condition: (_, siblingData) => {
                  return siblingData?.category === '66bcd390b33e8f6a30b8dafe' ? true : false
                },
              },
            },
            // {
            //   name: 'stripeProductID',
            //   label: 'Stripe Product',
            //   type: 'text',
            //   admin: {
            //     components: {
            //       Field: ProductSelect,
            //     },
            //   },
            // },
            {
              name: 'price__temporary',
              label: 'Price',
              type: 'number',
            },
            // {
            //   name: 'priceJSON',
            //   label: 'Price JSON',
            //   type: 'textarea',
            //   admin: {
            //     readOnly: true,
            //     hidden: true,
            //     rows: 10,
            //   },
            // },
          ],
        },
        {
          name: 'details',
          label: 'Details',
          fields: [
            {
              name: 'details',
              type: 'blocks',
              maxRows: 1,
              localized: true,
              required: true,
              blocks: [Content],
            },
            {
              name: 'moreDetails',

              type: 'blocks',
              localized: true,
              blocks: [Content, MediaBlock],
            },
          ],
        },
        {
          name: 'medias',
          fields: [
            { name: 'mainImage', type: 'upload', relationTo: 'media' },
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'SKU',
      name: 'sku',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    switchField({
      label: 'Is Active',
      name: 'isActive',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    }),
    switchField({
      label: 'LimitedEdition',
      name: 'isLimitedEdition',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    }),
    slugField('sku'),
    {
      name: 'availability',
      label: 'Availability',
      type: 'group',
      fields: [
        {
          type: 'radio',
          name: 'availabilityType',
          defaultValue: 'boolean',
          label: 'Availability Type',
          options: [
            { label: 'Boolean', value: 'boolean' },
            { label: 'Stock', value: 'stock' },
          ],
        },
        switchField({
          label: 'Is Available',
          name: 'isAvailable',
          defaultValue: true,
          admin: {
            position: 'sidebar',
            condition: (_, siblingData) => {
              return siblingData?.availabilityType === 'boolean' ? true : false
            },
          },
        }),
        {
          type: 'number',
          name: 'stock',
          admin: {
            condition: (_, siblingData) => {
              return siblingData?.availabilityType === 'stock' ? true : false
            },
          },
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
}
