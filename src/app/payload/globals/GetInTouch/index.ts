import type { GlobalConfig } from 'payload'

import { anyone } from '@app/access/anyone'
import { authenticated } from '@app/access/authenticated'

export const GetInTouch: GlobalConfig = {
  slug: 'getInTouch',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      type: 'array',
      name: 'socials',
      fields: [
        {
          name: 'plateform',
          type: 'select',
          options: [
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Pinterest',
              value: 'pinterest',
            },
          ],
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
}
