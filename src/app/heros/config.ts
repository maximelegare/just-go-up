import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { FontColorFeature } from '@app/payload/lexical/features/fontColorFeature/feature.server'
import { linkGroup } from '@app/payload/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      name: 'richText',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            FontColorFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'hasRightSideMedia',
      type: 'checkbox',
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
    },
    {
      name: 'rightSideMedia',
      type: 'upload',
      admin: {
        condition: (_, { type, hasRightSideMedia } = {}) =>
          hasRightSideMedia && ['highImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'hasBackgroundTextOverlay',
      type: 'checkbox',
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
    },
    {
      name: 'backgroundTextOverlay',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type, hasBackgroundTextOverlay } = {}) =>
          hasBackgroundTextOverlay && ['highImpact'].includes(type),
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  label: false,
}
