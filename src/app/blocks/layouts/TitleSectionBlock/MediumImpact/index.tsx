import React from "react"
import { TitleSectionBlockProps } from "@app/blocks/layouts/TitleSectionBlock"

export const MediumImpactTitle: React.FC<
  TitleSectionBlockProps & { className?: string; linkClassName?: string; subtitle?: string }
> = async (props) => {
  const { title } = props

  return <h4 className="font-bold">{title}</h4>
}
