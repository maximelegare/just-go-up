import React from 'react'
import ProductVariantItem from './ProductVariantItem'
import { Variant } from '@payload-types'
import { JustifyBetweenGrid } from '@app/components/JustifyBetweenGrid'
import { cn } from '@app/utilities/cn'

type ProductsGridProps = {
  docs: Variant[]
  doc: Variant
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ doc: selectedDoc, docs }) => {
  const CARD_WIDTH = 'w-[90px]'

  return (
    <JustifyBetweenGrid<Variant> items={docs} columnsPerRow={3} cardWidth={CARD_WIDTH}>
      {docs.map((currDoc, idx) => (
        <div className={cn(CARD_WIDTH)} key={idx}>
          <ProductVariantItem isSelected={currDoc.id === selectedDoc.id} doc={currDoc} />
        </div>
      ))}
    </JustifyBetweenGrid>
  )
}
