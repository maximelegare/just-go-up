import type { MessageField } from '@payloadcms/plugin-form-builder/types'

import RichText from '@app/components/RichText'
import React from 'react'

import { Width } from '../Width'

export const Message: React.FC<MessageField> = async ({ message }) => {
  return (
    <Width className="my-12" width="100">
      <RichText content={message ?? undefined} />
    </Width>
  )
}
