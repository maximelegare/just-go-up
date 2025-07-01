import type { CollectionConfig } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../../../access/anyone'
import { admins } from '@app/access/admins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: () => {
          return [
            FixedToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h6'] }),
            LinkFeature(),
            AlignFeature(),
          ]
        },
      }),
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
  },
}
