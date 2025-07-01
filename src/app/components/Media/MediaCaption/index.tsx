import RichText from '@app/components/RichText'
import { cn } from '@app/utilities/cn'
import { Media } from '@payload-types'
import React from 'react'

type Props = {
  caption: Media['caption']
  captionClassName?: string
  position?: 'default' | 'fullscreen'
}

export const MediaCaption: React.FC<Props> = ({ caption, captionClassName, position }) => {
  if (!caption) return null
  return (
    <div>
      {typeof caption !== 'string' && (
        <div
          className={cn(
            'mt-2',
            {
              container: position === 'fullscreen',
            },
            captionClassName,
          )}
        >
          <RichText content={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
