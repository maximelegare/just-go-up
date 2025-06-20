import { LowImpactHero } from '@app/heros/LowImpact'
import { MediumImpactHero } from '@app/heros/MediumImpact'
import { HighImpactHero } from '@app/heros/HighImpact'
import { NoHero } from '@app/heros/None'

export const heroesComponentsMap = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  none: NoHero,
}
