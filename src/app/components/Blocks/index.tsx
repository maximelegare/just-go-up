// @ts-nocheck
import React, { Fragment } from "react"

import type { Page } from "@payload-types"
import { toKebabCase } from "@app/utilities/toKebabCase"
import { Locale } from "ROOT/locales/locales"
import { blockComponentsMap } from "@app/_Map/blocks.map"
import { Gutter } from "../Gutter"

export const Blocks: React.FC<{
  limit?: number
  offset?: number
  blocks: Page["layout"][0][]
  containerClassName?: string
  urlSearchParams?: Record<string, string>
  params?: {
    locale?: Locale
    url?: string
    slugs?: string[]
  }
}> = (props) => {
  const { blocks, containerClassName, limit, offset = 0, urlSearchParams } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks?.map((block, index) => {
          if (limit && index >= limit + offset) return null
          if (index < offset) return null

          const showUrlParam = urlSearchParams?.show
          const { blockType } = block

          /*
            Hides the block based on the conditional searchParams renderer 
          */

          if (block?.conditionalRenderer?.show === "conditionally") {
            const showParams = block?.conditionalRenderer?.showParams || []
            const hideParams = block?.conditionalRenderer?.hideParams || []

            // Check if "none" is included in showParam
            const hasNone = showParams.some((el) => el.slug === "none")

            // If "none" is NOT included, check if showUrlParam is in showParams
            const shouldShow = hasNone || showParams.some((el) => el.slug === showUrlParam)

            // Check if showUrlParam is in hideParams
            const shouldHide = hideParams.some((el) => el.slug === showUrlParam)

            // Logic to decide rendering
            if (!shouldShow || shouldHide) {
              return null
            }
          }

          if (blockType && blockType in blockComponentsMap) {
            const Block = blockComponentsMap[blockType]

            if (Block) {
              const gutter = block.gutter
              return (
                <Gutter gutter={gutter} className={containerClassName} key={index}>
                  <Block
                    id={toKebabCase(blockType)}
                    {...block}
                    params={props.params}
                    urlSearchParams={props.urlSearchParams}
                  />
                </Gutter>
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
