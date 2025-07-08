import React from 'react'
import { Page } from '@payload-types'
import { Media } from '../Media'
import { MediaCaption } from '../Media/MediaCaption'

export type BigTitleProps = Extract<Page['layout'][0], { blockType: 'content' }>['bigTitle']

export const BigTitle: React.FC<
  BigTitleProps & { className?: string; linkClassName?: string; subtitle?: string }
> = async (props) => {
  const { title, enable, subtitle, showMainImage, image } = props

  if (!enable) return null

  return (
    <div className="container relative">
      <div className="h-full z-10 mb-6">
        <div className="prose">
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="prose opacity-70">
          <h4 className="font-normal">{subtitle}</h4>
        </div>
      </div>
      <div className="mb-8 lg:mb-14">
        {showMainImage && (
          <div>
            <div className="relative w-full h-full min-h-[40vh] lg:min-h-[60vh]">
              {typeof image !== 'string' && (
                <Media
                  fill
                  imgClassName="-z-10 rounded-xl object-cover"
                  priority
                  resource={image}
                />
              )}
            </div>
            {typeof image !== 'string' && <MediaCaption caption={image?.caption} />}
          </div>
        )}
      </div>
      {/* <Separator className="mt-4" /> */}
    </div>
  )
}
