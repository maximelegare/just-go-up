import { cn } from "@app/utilities/cn"
import { Media as MediaType } from "@payload-types"
import React from "react"

import { ItemsList } from "@app/blocks/layouts/ItemsListBlock/ItemsList"

type ImageSectionProps = {
  images: (string | MediaType)[]
  containerClassName?: string
}

export const ImagesSection: React.FC<ImageSectionProps> = ({ images, containerClassName }) => {
  return (
    <div className={cn(containerClassName)}>
      <ItemsList
        relationTo="media"
        layout="carousel"
        items={images.filter((el) => typeof el !== "string")}
        cardClassName="object-fit"
        imageSelector="images"
        isPrerendered={false}
        cardVariant="media"
      />
    </div>
  )
}
