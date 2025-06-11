import { formatPhoneNumber } from '@app/utilities/formatPhoneNumber'
import { getCachedGlobal } from '@app/utilities/getGlobals'
import { GetInTouch } from '@payload-types'
import React from 'react'
import { Locale } from 'ROOT/locales/locales'

type ContactInfosProps = {
  locale: Locale
}

export const ContactInfos: React.FC<ContactInfosProps> = async ({ locale }) => {
  const getInTouch: GetInTouch = await getCachedGlobal('getInTouch', 1, locale)()

  const { email, phoneNumber } = getInTouch

  if (!email && !phoneNumber) return null

  return (
    <div className="prose">
      <h5>Contact</h5>
      {phoneNumber && <p className="leading-none my-2">{formatPhoneNumber(phoneNumber)}</p>}
      {email && <p className="leading-none my-2">{email?.toUpperCase()}</p>}
    </div>
  )
}
