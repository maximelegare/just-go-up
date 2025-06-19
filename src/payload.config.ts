// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
// import { resendAdapter } from '@payloadcms/email-resend'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
// import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './app/payload/collections/Categories'
import { Media } from './app/payload/collections/Media'
import { Pages } from './app/payload/collections/Pages'
import { Products } from './app/payload/collections/Products'
import { Users } from './app/payload/collections/Users'
import { SleeveLengths } from '@app/payload/collections/SleeveLengths'
import { Footer } from './app/payload/globals/Footer/config'
import { Header } from './app/payload/globals/Header/config'
import { Sidebar } from './app/payload/globals/Sidebar/config'
import { Settings } from './app/payload/globals/Settings/config'
import { revalidateRedirects } from './app/payload/hooks/revalidateRedirects'
import { defaultLocale, locales } from 'ROOT/locales/locales'

import { en } from 'payload/i18n/en'
import { fr } from 'payload/i18n/fr'
import { FontColorFeature } from '@app/payload/lexical/features/fontColorFeature/feature.server'
import { GetInTouch } from '@app/payload/globals/GetInTouch'
import { Variants } from '@app/payload/collections/Variants'
import { revalidateGlobalsHandler } from '@app/endpoints/revalidate'
import { Links } from '@app/payload/collections/Links'
import { Fabrics } from '@app/payload/collections/Fabrics'
import { SearchParamValues } from '@app/payload/collections/SearchParams/values'
import { SearchParamKeys } from '@app/payload/collections/SearchParams/keys'
import { OptionsBars } from '@app/payload/collections/OptionsBars'
import { Blogs } from '@app/payload/collections/blogs'
// import { EmbedFeature } from '@payload/lexical/features/embedFeature/feature.server'
// import { FontColorFeature } from '@payload/lexical/features/fontColorFeature/feature.server'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle = () => {
  return 'Better Climber'
}

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  // email: resendAdapter({
  //   defaultFromAddress: process.env.SMTP_DEFAULT_FROM,
  //   defaultFromName: process.env.SMTP_DEFAULT_FROM,
  //   apiKey: process.env.RESEND_PRIVATE_KEY || '',
  // }),

  //   email:  nodemailerAdapter({
  //   defaultFromAddress: 'info@payloadcms.com',
  //   defaultFromName: 'Payload',
  //   // Nodemailer transportOptions
  //   transportOptions: {
  //     host: process.env.SMTP_HOST,
  //     port: 587,
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   },
  // }) as unknown as EmailAdapter,

  i18n: {
    supportedLanguages: { en, fr },
  },
  localization: {
    locales: locales.map((l) => l.locale),
    defaultLocale: defaultLocale,
    fallback: true,
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => {
      return [
        ...defaultFeatures,
        // TreeViewFeature(),
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5'] }),
        // FixedToolbarFeature(),
        InlineToolbarFeature(),
        FontColorFeature(),
        // EmbedFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },

                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  collections: [
    Pages,
    Media,
    Categories,
    Users,
    Products,
    SleeveLengths,
    Variants,
    Blogs,
    Links,
    Fabrics,
    SearchParamKeys,
    SearchParamValues,
    OptionsBars,
  ],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    {
      handler: revalidateGlobalsHandler,
      method: 'get',
      path: '/revalidate-globals',
    },
  ],
  globals: [Header, Footer, Sidebar, GetInTouch, Settings],
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
    redirectsPlugin({
      collections: ['pages'],
      overrides: {
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    nestedDocsPlugin({
      collections: ['categories'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    nestedDocsPlugin({
      collections: ['products'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `/products/${doc.slug}`, ''),
    }),
    nestedDocsPlugin({
      collections: ['blogs'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `/blogs/${doc.slug}`, ''),
    }),
    seoPlugin({
      collections: ['pages'],
      generateTitle,
      tabbedUI: true,
      uploadsCollection: 'media',
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5'] }),
                    ]
                  },
                }),
              }
            }
            return field
          })
        },
      },
    }),
    payloadCloudPlugin(), // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
