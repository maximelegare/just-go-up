import React, { Fragment } from 'react'

import type { Page } from '@payload-types'

import { toKebabCase } from '@app/utilities/toKebabCase'
import { Locale } from 'ROOT/locales/locales'
import { prebuiltLayoutComponentsMap } from '@app/_Map/prebuiltLayout.map'
import { cn } from '@app/utilities/cn'

export const PrebuiltLayouts: React.FC<{
  limit?: number
  offset?: number
  blocks: Page['prebuiltLayout'][0][]
  containerClassName?: string
  searchParams?: Record<string, string>
  params?: {
    locale?: Locale
    url?: string
    slugs?: string[]
  }
}> = (props) => {
  const { blocks, containerClassName, limit, offset = 0 } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks?.map((block, index) => {
          if (limit && index >= limit + offset) return null
          if (index < offset) return null

          const { blockType } = block

          if (blockType && blockType in prebuiltLayoutComponentsMap) {
            const PrebuiltLayoutBlock = prebuiltLayoutComponentsMap[blockType]

            if (PrebuiltLayoutBlock) {
              return (
                <div className={cn(containerClassName)} key={index}>
                  <PrebuiltLayoutBlock
                    id={toKebabCase(blockType)}
                    {...block}
                    params={props.params}
                    searchParams={props.searchParams}
                  />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
