import React from 'react'

import type { Page } from '../../../payload-types'

import { Media } from '../../components/Media'
import RichText from '../../components/RichText'
import { CMSLink } from '@app/components/Link'
import { getServerSideURL } from '@app/utilities/getServerSideURL'

export const MediumImpactHero: React.FC<Page['hero']> = async ({ media, richText, links }) => {
  const fullPath = await getServerSideURL('fullpath')

  return (
    <div className="relative flex h-[50vh] w-full">
      {typeof media === 'object' && (
        <div className="w-full">
          <Media
            fill
            imgClassName="-z-10 object-cover h-fit"
            priority
            resource={media ?? undefined}
          />
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute container mb-8 top-[40%] -translate-x-1/2 left-1/2   flex  h-fit  text-center">
            <RichText className="mb-6" content={richText} enableGutter={false} />
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink currentUrl={fullPath} {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
