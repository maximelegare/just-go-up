'use client'

import React from 'react'
import { Card } from '@app/components/Card/Base'
import useClickableCard from '@app/utilities/useClickableCard'
import { Media } from '@app/components/Media'
import Link from 'next/link'
import { VariantCardProps } from '../types'
import { Product } from '@payload-types'
import { CMSLink } from '@app/components/Link'
import { useClientSideUrl } from '@app/utilities/useClientSideUrl'
import { useTranslate } from 'ROOT/locales/i18n.client'

export const VariantCard: React.FC<VariantCardProps> = (props) => {
  const { card, link } = useClickableCard({})

  const { doc, style, className, title: titleFromProps } = props

  const {
    medias: { mainImage },
    price__temporary,
    slug,
    title: variantDescription,
    products,
  } = doc

  const { t } = useTranslate()

  let product: Product | null
  if (typeof products?.docs[0] === 'object') product = products.docs[0]

  const currentUrl = useClientSideUrl()

  const titleToUse = titleFromProps || product?.title || '!!!NOT ASSIGNED!!!!'
  const href = product?.title ? `/products/${product?.slug}?variant=${slug}` : '/'

  return (
    <Card ref={card.ref} className={className} style={style}>
      <div className="relative inline-block w-full not-prose">
        <CMSLink
          currentUrl={currentUrl}
          url={href}
          className="absolute z-[1]  my-2 right-2  -translate-y-[3px]  text-xs"
          label={t('components.cards.products.seeMore')}
          appearance="link"
          icon={{ type: 'radix/arrow-right', position: 'right', className: 'text-[8px]' }}
        ></CMSLink>
        <div
          className="absolute w-full   h-8 bg-black opacity-40"
          style={{ mixBlendMode: 'darken' }}
        ></div>
        {!mainImage && <div className="">No image</div>}
        {mainImage && typeof mainImage !== 'string' && <Media resource={mainImage} size="360px" />}
      </div>
      <div className="px-4 py-2 relative w-full">
        <div className="flex justify-between w-full">
          {titleToUse && (
            <div className="prose w-full">
              <h5 className="leading-none !text-base">
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse.toUpperCase()}
                </Link>
              </h5>
              <div className="flex w-full justify-between items-center">
                <div>
                  <p className="opacity-70 pb-2  text-sm leading-5">{variantDescription}</p>
                  <p className="m-0">{`${price__temporary?.toFixed(2)} $` || '$300 CAD'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
