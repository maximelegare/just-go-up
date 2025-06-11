'use client'

import React, { useEffect, useState } from 'react'

import { Variant } from '@payload-types'
import { cn } from '@app/utilities/cn'
// import { AddToCartButton } from '../AddToCartButton'
// import { RemoveFromCartButton } from '../RemoveFromCartButton'

export const priceFromJSON = (priceJSON: string, quantity: number = 1, raw?: boolean): string => {
  let price = ''

  if (priceJSON) {
    try {
      const parsed = JSON.parse(priceJSON)?.data[0]
      const priceValue = parsed.unit_amount * quantity
      const priceType = parsed.type

      if (raw) return priceValue.toString()

      price = (priceValue / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD', // TODO: use `parsed.currency`
      })

      if (priceType === 'recurring') {
        price += `/${
          parsed.recurring.interval_count > 1
            ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
            : parsed.recurring.interval
        }`
      }
    } catch (e) {
      console.error(`Cannot parse priceJSON`, e) // eslint-disable-line no-console
    }
  }

  return price
}

export const Price: React.FC<{
  product: Variant
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
  size?: 'sm' | 'base'
  hideActualPice?: boolean
}> = (props) => {
  const {
    product: { price__temporary } = {},
    // button = 'addToCart',
    quantity,
    size = 'base',
    // hideActualPice = false,
  } = props
  // const fillPrice = '30.99'

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
    decimalsPrice: string
    numberPrice: string
  }>(() => ({
    // actualPrice: priceFromJSON(price__temporary),
    actualPrice: price__temporary.toString(),
    withQuantity: price__temporary.toString(),
    // withQuantity: priceFromJSON(price__temporary, quantity),

    numberPrice: price__temporary.toString().split('.')[0],
    decimalsPrice: price__temporary.toString().split('.')[1],
  }))

  useEffect(() => {
    setPrice({
      // actualPrice: priceFromJSON(priceJSON ),
      // withQuantity: priceFromJSON(priceJSON , quantity),
      actualPrice: price__temporary.toString(),
      withQuantity: price__temporary.toString(),
      numberPrice: price__temporary.toString().split('.')[0],
      decimalsPrice: price__temporary.toString().split('.')[1] ?? '00',
    })
  }, [price__temporary, quantity])

  return (
    <div className="w-fit">
      {typeof price?.actualPrice !== 'undefined' && price?.withQuantity !== '' && (
        <div className="leading-1 flex flex-col gap-1">
          <div className="flex items-center">
            <p className={cn('inline', size === 'base' ? 'text-3xl' : 'text-xl')}>
              {price?.numberPrice}
            </p>
            <sup className={cn('inline opacity-80', size === 'base' ? 'text-sm' : 'text-[10px]')}>
              {price?.decimalsPrice}
            </sup>
          </div>
          {/* {quantity > 1 && ( */}
          {/* {!hideActualPice && <small>{`${price.actualPrice} x 2`}</small>} */}
          {/* )} */}
        </div>
      )}
      {/* {button && button === 'addToCart' && (
        <AddToCartButton product={product} appearance="default" />
        )} */}
      {/* {button && button === 'removeFromCart' && <RemoveFromCartButton product={product} />} */}
    </div>
  )
}
