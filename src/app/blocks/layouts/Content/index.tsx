import { cn } from '@app/utilities/cn'
import React from 'react'
import RichText from 'src/app/components/RichText'

import type { Page } from '@payload-types'

import { CMSLink } from '@app/components/Link'
import { BigTitle } from '@app/components/BigTitle'
import { getServerSideURL } from '@app/utilities/getServerSideURL'

export type ContentBlockProps = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  {
    id?: string
    containerClassName?: string
  } & ContentBlockProps
> = async (props) => {
  const fullPath = await getServerSideURL('fullpath')

  const {
    columns,
    column,
    containerClassName = 'container grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16 w-full',
    bigTitle,
  } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
    fullAdaptive: '',
  }

  return (
    <div>
      <BigTitle {...bigTitle} className="mb-[2rem]" />
      {columns && columns.length > 0 && (
        <div className={containerClassName}>
          {columns.map((col, index) => {
            const { enableLink, link, richText, size } = col
            return (
              <div
                className={cn(
                  `${colsSpanClasses[size] === 'fullAdaptive' ? 'w-full' : `col-span-4 lg:col-span-${colsSpanClasses[size || 'full']}`}`,
                  {
                    'md:col-span-2': size !== 'full',
                  },
                )}
                key={index}
              >
                <RichText content={richText} enableGutter={false} />
                {enableLink && <CMSLink currentUrl={fullPath} {...link} />}
              </div>
            )
          })}
        </div>
      )}
      {column && (
        <div className="w-full">
          <RichText content={column.richText} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
