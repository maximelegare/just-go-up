'use client'
import { Media } from '@app/components/Media'
import { cn } from '@app/utilities/cn'
import { Variant } from '@payload-types'
import React from 'react'

import { usePathname, useRouter } from 'next/navigation'

type ProductVariantItemProps = {
  doc: Variant
  isSelected?: boolean
}

const ProductVariantItem: React.FC<ProductVariantItemProps> = ({ doc, isSelected }) => {
  const { medias, price__temporary, sku } = doc
  const { mainImage } = medias

  const { push } = useRouter()
  const pathname = usePathname()

  const href = `${pathname}?variant=`
  return (
    <article
      className={cn(
        'bg-muted rounded-[7px] overflow-hidden text-center border-[1px] border-solid cursor-pointer',
        isSelected
          ? 'border-2 border-background shadow-[0_0_0_2px_hsl(var(--accent))]'
          : 'border-border',
      )}
      onClick={() => push(`${href}${sku}`, { scroll: false })}
    >
      {!mainImage && <div className="">No image</div>}
      {mainImage && typeof mainImage !== 'string' && <Media resource={mainImage} size="100px" />}
      <p className="p-1">{price__temporary.toFixed(2)}$</p>
      <p className="not-prose text-[0.6rem] opacity-80">#{sku}</p>
    </article>
  )
}

export default ProductVariantItem
