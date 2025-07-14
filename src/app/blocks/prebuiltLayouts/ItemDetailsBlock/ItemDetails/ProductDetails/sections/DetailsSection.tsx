import { cn } from '@app/utilities/cn'
import { Product, Variant } from '@payload-types'
import React from 'react'
import { Separator } from '@app/components/ui/separator'
import { Blocks } from '@app/components/Blocks'
import { VariantsSection } from './VariantsSection'

type InformationsProps = {
  doc: Variant
  containerClassName?: string
  product: Product
}

export const DetailsSection: React.FC<InformationsProps> = ({
  doc,
  product,
  containerClassName,
}) => {
  return (
    <div className={cn(containerClassName)}>
      <div className="flex flex-col">
        <VariantsSection doc={doc} docs={product?.variants as Variant[]} />
        <Separator className="my-3" />
        <div className="prose">
          <Blocks blocks={doc.details.details} />
        </div>
      </div>
    </div>
  )
}
