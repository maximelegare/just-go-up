'use client'
import useClickableCard from '@app/utilities/useClickableCard'
import React from 'react'

import { Media } from '@app/components/Media'
import { MediaCardProps } from '../types'
import { Card } from '../Base'

export const MediaCard: React.FC<MediaCardProps> = (props) => {
  const { card } = useClickableCard({})
  const { className, doc: media, style } = props

  return (
    <Card ref={card.ref} className={className} style={style}>
      <div className="relative w-full">
        {!media && <div className="">No image</div>}
        {media && typeof media !== 'string' && <Media resource={media} size="360px" />}
      </div>
    </Card>
  )
}
