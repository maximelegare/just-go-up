import React from 'react'

import type { Page } from '@payload-types'

import { heroesComponentsMap } from '@app/_Map/heros.map'

export const Hero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  const HeroToRender = heroesComponentsMap[type]

  if (!HeroToRender) return null

  return (
    <div className="pt-24">
      <HeroToRender {...props} />
    </div>
  )
}
