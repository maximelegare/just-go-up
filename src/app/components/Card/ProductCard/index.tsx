'use client'
import useClickableCard from '@app/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import { Media } from '@app/components/Media'
import { ProductCardProps } from '../types'
import { Card } from '../Base'
import { Variant } from '@payload-types'
import { useTranslate } from 'ROOT/locales/i18n.client'
import { useClientSideUrl } from '@app/utilities/useClientSideUrl'
import { CMSLink } from '@app/components/Link'

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { className, style, relationTo, doc, title: titleFromProps } = props

  const { t } = useTranslate()

  const { card, link } = useClickableCard({})

  const { variants, slug, title: productTitle } = doc

  const variantToRender = variants?.find(
    (variant) =>
      typeof variant !== 'string' &&
      typeof doc.defaultVariant !== 'string' &&
      doc.defaultVariant.id === variant.id,
  ) as Variant

  const {
    medias: { mainImage },
  } = variantToRender

  const titleToUse = titleFromProps || productTitle
  const href = `/${relationTo}/${slug}`

  const currentUrl = useClientSideUrl()

  const getLowestPrice = () => {
    return variants.reduce<number>((acc, el, idx) => {
      if (typeof el !== 'object') return acc
      else if (idx === 0) acc = el.price__temporary
      else if (el?.price__temporary < acc) acc = el?.price__temporary
      return acc
    }, 0)
  }

  return (
    <Card ref={card.ref} className={className} style={style}>
      <div className="relative inline-block w-full not-prose">
        <CMSLink
          currentUrl={currentUrl}
          url={href}
          className="absolute z-[1] my-2 right-2  -translate-y-[3px]  text-xs"
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
      <div className="relative">
        <div className="flex justify-between w-full">
          <div className="px-4 py-2 relative">
            <div className="flex justify-between w-full">
              {titleToUse && (
                <div className="prose">
                  <h5 className="leading-none !text-base hover:underline">
                    <Link className="not-prose" href={href} ref={link.ref}>
                      {titleToUse.toUpperCase()}
                    </Link>
                  </h5>
                  <p className="m-0">
                    <span className="text-sm">{t('components.cards.products.startingAt')}</span>
                    {`${getLowestPrice().toFixed(2)} $` || '$300 CAD'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
