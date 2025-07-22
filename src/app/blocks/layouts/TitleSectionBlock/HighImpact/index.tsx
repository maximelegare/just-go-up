import React from "react"
import { TitleSectionBlockProps } from "@app/blocks/layouts/TitleSectionBlock"
import { Media } from "@app/components/Media"
import { MediaCaption } from "@app/components/Media/MediaCaption"

export const HighImpactTitle: React.FC<
  TitleSectionBlockProps & { className?: string; linkClassName?: string; subtitle?: string }
> = async (props) => {
  const { title, subtitle, showImage, image } = props

  return (
    <div className="relative mt-4">
      <div className="h-full z-10 mb-6">
        <div className="prose">
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="prose opacity-70">
          <h4 className="font-normal">{subtitle}</h4>
        </div>
      </div>
      <div className="mb-8 lg:mb-14">
        {showImage && (
          <div>
            <div className="relative w-full h-full min-h-[40vh] lg:min-h-[60vh]">
              {typeof image !== "string" && (
                <Media
                  fill
                  imgClassName="-z-10 rounded-xl object-cover"
                  priority
                  resource={image}
                />
              )}
            </div>
            {typeof image !== "string" && <MediaCaption caption={image?.caption} />}
          </div>
        )}
      </div>
    </div>
  )
}
