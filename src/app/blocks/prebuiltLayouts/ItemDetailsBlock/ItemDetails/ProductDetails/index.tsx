import { cn } from '@app/utilities/cn'
import { Product, Variant } from '@payload-types'
import React from 'react'
import { DetailsSection } from './sections/DetailsSection'
import { BigTitle } from '@app/components/BigTitle'
import { MoreDetailsSection } from './sections/MoreDetailsSection'
import { Separator } from '@app/components/ui/separator'
import { PayloadRedirects } from '@app/components/PayloadRedirects'
import { ImagesSection } from './sections/ImagesSection'

export type ProductDetailsProps = {
  doc: Product
  searchParams: Record<string, string>
}
export const ProductDetails: React.FC<ProductDetailsProps> = ({ doc, searchParams }) => {
  const { title } = doc

  let variantToRender: Variant | null = null

  if (searchParams?.variant) {
    variantToRender = doc.variants.find(
      (variant) => typeof variant !== 'string' && variant.slug === searchParams.variant,
    ) as Variant
  } else {
    variantToRender = doc.variants.find(
      (variant) =>
        typeof variant !== 'string' &&
        typeof doc.defaultVariant !== 'string' &&
        doc.defaultVariant.id === variant.id,
    ) as Variant
  }

  if (!variantToRender) return <PayloadRedirects url="/" />

  const { mainImage, images } = variantToRender?.medias
  const formatedImages = images.map((el) => el.image)

  return (
    <>
      <BigTitle title={title} className="mb-4" enable />
      <div className="flex flex-col gap-4 h-full">
        <div
          className={cn(
            'w-full lg:grid lg:grid-row-1 md:grid grid-cols-1 md:grid-cols-2 h-full lg:grid-cols-3 gap-5',
          )}
        >
          <ImagesSection
            containerClassName="lg:col-span-1 md:top-20  md:sticky md:top-20  md:h-fit  md:h-fit"
            images={[mainImage, ...formatedImages]}
          />
          <DetailsSection containerClassName="lg:col-span-2" doc={variantToRender} product={doc} />
        </div>
        <Separator className="container my-3" />
      </div>
      <MoreDetailsSection doc={variantToRender} />
    </>
  )
}
