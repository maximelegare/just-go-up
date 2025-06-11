import { GetInTouch } from '@payload-types'
import React from 'react'
import { CMSLink } from '../Link'

type SocialMediaListProps = {
  getInTouch: GetInTouch
}

export const SocialMediaList: React.FC<SocialMediaListProps> = ({ getInTouch }) => {
  return (
    <div className="flex gap-3 w-full">
      {getInTouch?.socials?.map((item, idx) => (
        <CMSLink
          key={idx}
          url={item.link}
          appearance="iconOnly"
          currentUrl=""
          icon={{
            type: `brand/${item.plateform}`,
            className: 'fill-foreground w-6 h-6 p-1 rounded-lg',
          }}
        />
      ))}
    </div>
  )
}
