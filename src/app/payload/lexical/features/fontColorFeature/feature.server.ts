import { createServerFeature } from '@payloadcms/richtext-lexical'
// import { FontColorFeatureClient } from './feature.client'

// const urlField: TextField = {
//   name: 'fontColor',
//   type: 'text',
//   required: true,
// }

export const FontColorFeature = createServerFeature({
  feature: {
    ClientFeature:
      'src/app/payload/lexical/features/fontColorFeature/feature.client.ts#FontColorFeatureClient',

    // generateSchemaMap: () => {
    //   const schemaMap = new Map<string, Field[]>()

    //   const fields = [urlField]
    //   schemaMap.set('fields', fields)

    //   return schemaMap
    // },
  },
  key: 'fontColor',
})
