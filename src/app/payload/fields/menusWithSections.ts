import type { Field } from 'payload'
import deepMerge from '@app/utilities/deepMerge'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

type MenuWithSections = (maxRows?: number, overrides?: Partial<Field>) => Field

export const menusWithSections: MenuWithSections = (maxRows = 0, overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'linkType',
          defaultValue: 'link',
          type: 'radio',
          options: [
            {
              label: 'Link',

              value: 'link',
            },
            {
              label: 'Context Menu',
              value: 'contextMenu',
            },
          ],
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'links',
          admin: {
            condition: (_, { linkType }) => linkType === 'link',
          },
        },

        {
          name: 'triggerType',
          type: 'radio',
          defaultValue: 'link',
          admin: {
            condition: (_, { linkType }) => linkType === 'contextMenu',
          },
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Text', value: 'text' },
          ],
        },
        {
          name: 'linkTrigger',
          type: 'relationship',
          relationTo: 'links',
          required: true,
          admin: {
            condition: (_, { linkType, triggerType }) =>
              linkType === 'contextMenu' && triggerType === 'link',
          },
        },
        {
          name: 'textTrigger',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            condition: (_, { linkType, triggerType }) =>
              linkType === 'contextMenu' && triggerType === 'text',
          },
        },
        {
          name: 'contextSections',
          label: 'Sections',
          type: 'array',
          maxRows: 3,
          fields: [
            {
              name: 'sectionType',
              type: 'select',
              defaultValue: 'links',
              options: [
                { label: 'Links', value: 'links' },
                { label: 'Social Media', value: 'socialMedia' },
              ],
            },
            {
              name: 'sectionTitle',
              label: 'Title',
              localized: true,
              type: 'text',
              required: true,
            },
            {
              name: 'text',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: () => {
                  return [LinkFeature(), FixedToolbarFeature(), InlineToolbarFeature()]
                },
              }),
              admin: {
                condition: (_, { sectionType }) => sectionType === 'text',
              },
            },
            {
              name: 'sectionLinks',
              label: 'Links',
              type: 'relationship',
              relationTo: 'links',
              hasMany: true,
              admin: {
                condition: (_, { sectionType }) => sectionType === 'links',
              },
            },
          ],
          admin: {
            condition: (_, { linkType }) => linkType === 'contextMenu',
          },
        },
      ],
      maxRows: maxRows,
    },
    overrides,
  )
