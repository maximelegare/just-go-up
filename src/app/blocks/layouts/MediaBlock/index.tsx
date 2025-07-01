import type { StaticImageData } from 'next/image'

import { cn } from '@app/utilities/cn'
import React from 'react'

import type { Page } from '@payload-types'

import { Media } from '@app/components/Media'
import { MediaCaption } from '@app/components/Media/MediaCaption'

export type MediaBlockProps = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  id?: string
  imgClassName?: string
  staticImage?: StaticImageData
}

export const MediaBlock: React.FC<MediaBlockProps> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    position = 'default',
    staticImage,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',
        {
          container: position === 'default' && enableGutter,
        },
        className,
      )}
    >
      {position === 'fullscreen' && (
        <div className="relative">
          <Media resource={media} src={staticImage} />
        </div>
      )}
      {position === 'default' && (
        <Media imgClassName={cn('rounded', imgClassName)} resource={media} src={staticImage} />
      )}
      <MediaCaption caption={caption} captionClassName={captionClassName} position={position} />
    </div>
  )
}
