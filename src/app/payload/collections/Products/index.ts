import type { CollectionConfig } from 'payload'

import { slugField } from '@app/payload/fields/slug'
import switchField from '@app/payload/fields/switch/config'
import { admins } from '@app/access/admins'
import { anyone } from '@app/access/anyone'
// import { checkUserPurchases } from './access/checkUserPurchases'
// import { beforeProductChange } from './hooks/beforeChange'
// import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
// import { revalidateProduct } from './hooks/revalidateProduct'
// import { ProductSelect } from './ui/ProductSelect'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
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
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'variants',
      type: 'relationship',
      relationTo: 'variants',
      hasMany: true,
    },
    {
      name: 'defaultVariant',
      type: 'relationship',
      relationTo: 'variants',
      hasMany: false,
      //  @ts-expect-error
      validate: (val: string, { siblingData }: { siblingData: { variants: string[] } }) => {
        const isValInVariants = Boolean(siblingData?.variants?.find((el) => el === val))
        if (!isValInVariants) {
          return 'Please select a Default Variant included in the Variants list'
        }
        return true
      },
    },
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
    switchField({
      label: 'Is Active',
      name: 'isActive',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    }),
    slugField(),
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
