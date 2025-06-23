import React from 'react'
import { Page } from '@payload-types'
import { Separator } from '../ui/seperator'

export type BigTitleProps = Extract<Page['layout'][0], { blockType: 'content' }>['bigTitle']

export const BigTitle: React.FC<
  BigTitleProps & { className?: string; linkClassName?: string; subtitle?: string }
> = async (props) => {
  const { title, enable, subtitle } = props

  if (!enable) return null

  return (
    <div className="container relative">
      <div className="h-full z-10">
        <div className="prose">
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="prose opacity-70">
          <h4 className="font-normal">{subtitle}</h4>
        </div>
      </div>
      <Separator className="mt-4" />
    </div>
  )
}
