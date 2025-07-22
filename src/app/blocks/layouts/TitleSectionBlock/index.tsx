import React from "react"

import type { Page } from "@payload-types"

import { titlesComponentsMap } from "@app/_Map/titles.map"

export type TitleSectionBlockProps = Extract<Page["layout"][0], { blockType: "titleSection" }>

export const TitleSectionBlock: React.FC<TitleSectionBlockProps> = (props) => {
  const { type } = props || {}

  const TitleToRender = titlesComponentsMap[type]

  if (!TitleToRender) return null

  return <TitleToRender {...props} />
}
