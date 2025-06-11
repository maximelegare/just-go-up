'use client'
import React from 'react'

import type { Page } from '@payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '../../components/Media'
import RichText from '../../components/RichText'
import { cn } from '@app/utilities/cn'
import { AutoAjustingTextOverlay } from '@app/components/AutoAjustingTextOverlay'
import { useClientSideUrl } from '@app/utilities/useClientSideUrl'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  hasRightSideMedia,
  rightSideMedia,
  backgroundTextOverlay,
  hasBackgroundTextOverlay,
}) => {
  const fullPath = useClientSideUrl()

  return (
    <div className="relative lg:h-screen  flex text-white " data-theme="dark">
      <div
        className={cn(
          'container mt-[6rem] mb-8 z-10',
          hasRightSideMedia && 'block sm:grid sm:grid-cols-12',
        )}
      >
        <div className={cn('mt-[2rem] relative col-span-8 lg:col-span-7')}>
          <div className="">
            <RichText className="" content={richText} enableGutter={false} />
            <div className="pt-[5rem] not-prose">
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex gap-4">
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i} className="">
                        <CMSLink
                          {...link}
                          currentUrl={fullPath}
                          className="prose"
                          icon={{
                            type: 'radix/arrow-right',
                            position: 'right',
                            className: 'ml-2 h-[1.7em] w-[1.7em]',
                          }}
                        />
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
        {hasRightSideMedia && (
          <div className="relative  w-full h-full  justify-end hidden lg:min-h-[80vh] sm:flex col-span-4 lg:col-span-5">
            <Media
              fill
              imgClassName="-z-10 object-cover sm:object-contain"
              priority
              resource={rightSideMedia ?? undefined}
            />
          </div>
        )}
      </div>
      {hasBackgroundTextOverlay && (
        <AutoAjustingTextOverlay
          text={backgroundTextOverlay}
          containerClassName="mt-[8rem] sm:mt-[10rem]"
          textClassName="font-bold "
        />
      )}
      <div className=" select-none">
        {typeof media === 'object' && (
          <React.Fragment>
            <Media fill imgClassName="-z-10 object-cover" priority resource={media ?? undefined} />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

// <div class="relative h-screen">
//     <!-- Background Image -->
//     <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/path/to/texture-image.jpg');"></div>

//     <!-- BIKANKYMTL Text in Background -->
//     <div class="absolute inset-0 flex justify-center items-center text-gray-700 opacity-10 z-0">
//         <h1 class="text-8xl md:text-9xl font-extrabold">BIKANKYMTL</h1>
//     </div>

//     <!-- Overlay to Darken Background -->
//     <div class="absolute inset-0 bg-black bg-opacity-60"></div>

//     <!-- Content -->
//     <div class="relative flex flex-col md:flex-row justify-center items-center md:justify-between h-full px-6 md:px-12 lg:px-24">
//         <!-- Text Content -->
//         <div class="text-center md:text-left text-white md:max-w-md z-10">
//             <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">BIKANKYMTL</h1>
//             <p class="text-xl md:text-2xl lg:text-3xl mt-4">FOR THOSE WHO <span class="text-yellow-500">CHOOSE</span> TO STAND OUT.</p>
//             <a href="#" class="inline-block mt-6 text-yellow-500 text-lg md:text-xl lg:text-2xl font-bold hover:underline">
//                 Explore &rarr;
//             </a>
//         </div>
//         <!-- Image of Woman -->
//         <div class="mt-8 md:mt-0 md:absolute md:right-0 md:bottom-0 z-10">
//             <img src="/path/to/woman-image.png" alt="Woman Image" class="w-full max-w-sm md:max-w-none md:w-auto h-auto object-cover md:object-contain md:max-h-full">
//         </div>
//     </div>
// </div>
