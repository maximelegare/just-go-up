import React from 'react'

import type { Page } from '../../../payload-types'

import { Media } from '@app/components/Media'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      media?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      media?: Page['hero']['media']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ media }) => {
  return (
    <div className="relative  flex h-[10rem] w-full">
      {typeof media === 'object' && (
        <React.Fragment>
          <Media
            fill
            imgClassName="-z-10 object-cover h-fit"
            priority
            resource={media ?? undefined}
          />
          <div className="absolute z-[5] pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        </React.Fragment>
      )}
    </div>
  )
}
