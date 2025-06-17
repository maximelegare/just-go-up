'use client'

import React from 'react'
import { Card } from '../Base'
import { BlogCardProps } from '../types'
import { Media } from '@app/components/Media'
import { AspectRatio } from '@app/components/Media/AspectRatio'
import { DisplayDate } from '@app/components/Date'

export const BlogCard: React.FC<BlogCardProps> = ({ doc }) => {
  const {
    title,
    subtitle,
    medias: { mainImage },
    publishedOn,
    categories,
  } = doc

  return (
    <Card className="p-2" href="/test">
      <div className="flex justify-between">
        <div>
          <DisplayDate date={publishedOn} />
          <div>
            <h3 className="my-0 font-bold">{title}</h3>
            <p>{subtitle}</p>
          </div>
          <div className="flex gap-1 mt-3">
            {categories &&
              categories.map((el, idx) => {
                return (
                  typeof el !== 'string' && (
                    <p className="p-1 text-xs rounded-2xl bg-zinc-300 w-fit" key={idx}>
                      {el.title}
                    </p>
                  )
                )
              })}
          </div>
        </div>
        <AspectRatio ratio="aspect-square" width="w-40">
          {mainImage && typeof mainImage !== 'string' && (
            <Media fill objectFit="cover" resource={mainImage} />
          )}
        </AspectRatio>
      </div>
      {/* <div className="">
            <Image src="/website-template-OG.webp" alt="Test image" fill className="object-cover" />
            </div> */}
    </Card>
  )
}
