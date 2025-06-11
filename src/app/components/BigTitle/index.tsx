import { Squigly } from '@app/components/Squigly'
import React from 'react'
import { cn } from '@app/utilities/cn'
import { CMSLink } from '@app/components/Link'
import { Page } from '@payload-types'
import { getServerSideURL } from '@app/utilities/getServerSideURL'

export type BigTitleProps = Extract<Page['layout'][0], { blockType: 'content' }>['bigTitle']

export const BigTitle: React.FC<
  BigTitleProps & { className?: string; linkClassName?: string; subtitle?: string }
> = async (props) => {
  const { title, enable, enableLink, className, linkClassName, link, subtitle } = props
  const fullPath = await getServerSideURL('fullpath')

  if (!enable) return null

  return (
    <div className="container overflow-hidden relative">
      <div className={cn('relative  h-[6rem] w-full flex justify-between', className)}>
        <div className="flex h-full ">
          <div className="flex h-full z-10 items-end">
            <div className="flex items-center gap-2">
              <div className="prose">
                <h2 className="leading-[0.8]">
                  {subtitle ? subtitle.toUpperCase() : title.toUpperCase()}
                </h2>
              </div>
              <Squigly />
            </div>
          </div>
          <div className="h-fit absolute z-[5]  bottom-0  text-[6rem] lg:text-[8rem] text-muted opacity-60  font-bold leading-[0.75] m-0 -left-[5px] whitespace-nowrap">
            {title.toUpperCase()}
          </div>
        </div>
        {enableLink && (
          <CMSLink className={cn('self-end z-10', linkClassName)} currentUrl={fullPath} {...link} />
        )}
      </div>
      <div className="absolute z-[5] pointer-events-none right-0  bottom-0 w-[60px] h-full bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}
