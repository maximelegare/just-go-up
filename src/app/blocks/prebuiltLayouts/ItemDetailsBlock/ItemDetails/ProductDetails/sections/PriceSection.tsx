import { cn } from '@app/utilities/cn'
import { Button } from '@app/components/ui/button'
import { Badge } from '@app/components/Badge'
import { Price } from '@app/components/Price'
import { Variant } from '@payload-types'
import React from 'react'
import { translate } from 'ROOT/locales/i18n.server'
import { Separator } from '@app/components/ui/separator'

type PriceSectionProps = {
  doc: Variant
}

export const PriceSection: React.FC<PriceSectionProps> = async ({ doc }) => {
  const { t } = await translate()
  const { availability } = doc

  const getVariantAvailability = (): boolean => {
    // If it is handled by the isAvailable Boolean
    if (availability?.availabilityType === 'boolean') {
      return availability?.isAvailable ? true : false
    }
    // If it is handled by the stock quantity
    else if (availability?.availabilityType === 'stock') {
      return availability?.stock > 0 ? true : false
    }
    // If they are undefined
    else return false
  }

  return (
    <div className="mb-3 relative">
      <Badge
        show={true}
        title={t('pages.itemsDetails.limitedEdition')}
        className="absolute -left-2"
      />
      <div
        className={cn(
          'p-4 w-full flex justify-center pb-8 items-center gap-6',
          true ? 'pt-10' : 'pt-6',
        )}
      >
        <Price product={doc} />
        {getVariantAvailability() ? (
          <h5 className="text-accent">{t('pages.itemsDetails.available')}</h5>
        ) : (
          <h5 className="text-error opacity-80">{t('pages.itemsDetails.unavailable')}</h5>
        )}
      </div>
      <Button disabled className="w-full">
        {t('pages.itemsDetails.addToCart')}
      </Button>
      <Separator className="mt-4" />
      {doc?.sku && (
        <div className="mt-2 mb-2">
          <h5 className="mt-0 leading-6 text-xl">#{doc.sku}</h5>
        </div>
      )}
      {doc?.title && (
        <div className="mb-8 opacity-80">
          {/* <h5 className="underline mb-1">{t('pages.itemsDetails.variant')}</h5> */}
          <h4 className="mt-0 leading-6 text-xl text-button-foreground">{doc.title}</h4>
        </div>
      )}
    </div>
  )
}
