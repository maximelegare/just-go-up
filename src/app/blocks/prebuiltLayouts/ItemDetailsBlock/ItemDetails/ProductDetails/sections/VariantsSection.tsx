import { Card } from '@app/components/Card/Base'
import { Variant } from '@payload-types'
import React from 'react'
import { PriceSection } from './PriceSection'
import { ProductsGrid } from './SelectProductGrid/ProductsGrid'

type VariantsSectionProps = {
  docs: Variant[]
  doc: Variant
}

export const VariantsSection: React.FC<VariantsSectionProps> = ({ docs, doc }) => {
  return (
    <Card className="w-full  lg:max-w-[20rem] p-2 border-2 bg-transparent rounded-xl hover:cursor-default">
      <PriceSection doc={doc} />
      <ProductsGrid doc={doc} docs={docs.filter((el) => el.isActive === true)} />
    </Card>
  )
}
