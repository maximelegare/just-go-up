//@ts-nocheck
import React from "react"

import configPromise from "@payload-config"

import type { Blog, Page } from "@payload-types"
import { CollectionSlug, getPayload } from "payload"
import { Locale } from "ROOT/locales/locales"
import { getServerSideURL } from "@app/utilities/getServerSideURL"
import { getUrlData } from "@app/utilities/searchParams"

import { toKebabCase } from "@app/utilities/toKebabCase"
import { blockComponentsMap } from "@app/_Map/blocks.map"
import { notFound } from "next/navigation"

export type DynamicContentBlockProps = Extract<Page["layout"][0], { blockType: "dynamicContent" }>

export const DynamicContentBlock: React.FC<
  {
    id?: string
    urlSearchParams?: Record<string, string>
    params?: {
      locale?: Locale
    }
  } & DynamicContentBlockProps
> = async (props) => {
  const fullPath = await getServerSideURL("fullpath")
  const data = getUrlData(fullPath)

  const payload = await getPayload({ config: configPromise })

  const { relationTo, blockType, layout } = props

  const fetchedItem = await payload.find({
    locale: props.params?.locale,
    collection: relationTo as CollectionSlug,
    depth: 5,
    limit: 1,
    where: {
      "breadcrumbs.url": {
        equals: data.pathnameWithoutLocale,
      },
    },
  })

  const doc = fetchedItem.docs[0] as Blog

  // Redirects to not found if item not active
  if (!doc?.isActive) {
    return notFound()
  }

  if (blockType !== "dynamicContent") return null

  return (
    <>
      {layout.map((layoutBlock, layoutIndex) => {
        const contentBlocks = doc?.content?.content
        const {
          title: docTitle,
          subtitle: docSubtitle,
          medias: { mainImage: docImage },
        } = doc
        if (!Array.isArray(contentBlocks)) return null

        return contentBlocks?.map((innerBlock, innerIndex) => {
          const Block = blockComponentsMap[layoutBlock.blockType]

          if (!Block) return null

          // Overights the titleSection's fields to use document's specific fields
          let innerBlockProp
          if (innerBlock.blockType === "titleSection" && innerBlock.useDocuementFields) {
            innerBlockProp = {
              ...innerBlock,
              title: docTitle ?? innerBlock.title,
              subtitle: docSubtitle ?? innerBlock.subtitle,
              image: docImage ?? innerBlock.image,
              showImage: innerBlock.showImage,
            }
          } else {
            innerBlockProp = {
              ...innerBlock,
            }
          }

          return (
            <div key={innerBlock.id ?? `${layoutIndex}-${innerIndex}`}>
              <Block
                id={toKebabCase(innerBlock.blockType)}
                blockType={innerBlock.blockType}
                {...innerBlockProp}
                params={props.params}
                urlSearchParams={props.urlSearchParams}
              />
            </div>
          )
        })
      })}
    </>
  )
}
