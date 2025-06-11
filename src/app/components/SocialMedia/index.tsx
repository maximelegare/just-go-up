import { getCachedGlobal } from '@app/utilities/getGlobals'
import { GetInTouch } from '@payload-types'
import React from 'react'
import { Locale } from 'ROOT/locales/locales'
import { SocialMediaList } from '@app/components/SocialMediaList'

type SocialMediaListProps = {
  locale: Locale
}

export const SocialMedia: React.FC<SocialMediaListProps> = async ({ locale }) => {
  const getInTouch: GetInTouch = await getCachedGlobal('getInTouch', 2, locale)()

  return <SocialMediaList getInTouch={getInTouch} />
}
