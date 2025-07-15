import React from 'react'
import RichText from 'src/app/components/RichText'

import type { Page } from '../../../../payload-types'

import { CMSLink } from '../../../components/Link'

export type CallToActionProps = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  CallToActionProps & {
    id?: string
  }
> = ({ links, richText }) => {
  return (
    <div className="">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          <RichText content={richText} enableGutter={false} />
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink currentUrl="" key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
