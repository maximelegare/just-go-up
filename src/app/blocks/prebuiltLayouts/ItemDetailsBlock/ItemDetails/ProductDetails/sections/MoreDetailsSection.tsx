import { Blocks } from '@app/components/Blocks'
import { Variant } from '@payload-types'
import React from 'react'

type MoreInfosProps = {
  doc: Variant
}

export const MoreDetailsSection: React.FC<MoreInfosProps> = ({ doc }) => {
  return <Blocks blocks={doc.details.moreDetails} />
}
