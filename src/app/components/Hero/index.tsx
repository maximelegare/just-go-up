import React from 'react'

import type { Page } from '@payload-types'

import { heroesComponentsMap } from '@app/_Map/heros.map'

export const Hero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroesComponentsMap[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
