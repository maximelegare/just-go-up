'use client'

import useClickableCard from '@app/utilities/useClickableCard'
import { CategoryCardProps } from '../types'
import { Media } from '@app/components/Media'
import { Card } from '../Base'

export const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { card } = useClickableCard({})
  const { doc, className, style } = props

  const { title, mainImage, slug } = doc || {}

  const href = `/products?category=${slug}`

  return (
    <Card ref={card.ref} className={className} style={style} href={href}>
      <div className="relative group w-full h-full">
        <div className="prose absolute z-10 bottom-2 left-[10px]">
          <div className="relative h-fit">
            <div className="text-foreground leading-none m-0 font-bold ease-in-out opacity-75 text-3xl  duration-500 transition-all">
              {title.toUpperCase()}
            </div>
            <div
              style={{ mixBlendMode: 'overlay' }}
              className="text-6xl text-foreground group-hover:text-7xl ease-in-out duration-500 transition-all tracking-tight absolute origin-top-left -rotate-90  leading-none m-0 p-0 -left-[3px] font-bold opacity-20"
            >
              {title.toUpperCase()}
            </div>
          </div>
        </div>
        {!mainImage && <div className="">No image</div>}
        {mainImage && typeof mainImage !== 'string' && (
          <Media imgClassName="-z-10" resource={mainImage} size="360px" />
        )}
      </div>
    </Card>
  )
}
