import { Block } from 'payload'

import { blockComponentsMap } from '@app/_Map/blocks.map'

const SLUG = 'dynamicContent'

export const options = Object.keys(blockComponentsMap).reduce<{ label: string; value: string }[]>(
  (acc, val) => {
    acc.push({
      label: `${val[0].toUpperCase()}${val.slice(1)}`,
      value: val,
    })
    return acc
  },
  [] as { label: string; value: string }[],
)

// Filter to exclude the Dynamic content block from the list
// const optionsToUse = options.filter((option) => option.value !== SLUG )

// Temporary option, the other ones will be available eventually.
const optionsToUse = options.filter((option) => option.value === 'content')

export const DynamicContent: Block = {
  slug: SLUG,
  fields: [
    {
      name: 'layout',
      type: 'array',
      fields: [
        {
          name: 'block',
          type: 'select',
          options: optionsToUse,
        },
        {
          name: 'relationTo',
          type: 'select',
          options: [
            {
              label: 'Blogs',
              value: 'blogs',
            },
          ],
        },
      ],
    },
  ],
}
