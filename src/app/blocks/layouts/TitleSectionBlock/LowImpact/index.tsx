import React from "react"
import { TitleSectionBlockProps } from "@app/blocks/layouts/TitleSectionBlock"

export const LowImpactTitle: React.FC<
  TitleSectionBlockProps & { className?: string; linkClassName?: string; subtitle?: string }
> = async (props) => {
  const { title } = props

  return <h5 className="!m-0 leading-none">{title}</h5>
}
