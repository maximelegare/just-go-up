import Link from 'next/link'
import React from 'react'

import { Button } from '@app/components/ui/button'
import { translate } from 'ROOT/locales/i18n.server'
import { Logo } from '@app/components/Logo/Official'
import { LocaleSelector } from '@app/providers/Locale/LocaleSelector'

export default async function UnderConstruction() {
  const { t } = await translate()

  return (
    <div className="container pb-20 flex justify-center h-screen items-center">
      <div className="flex items-center flex-col">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="prose max-w-none mb-14">
          <h1 style={{ marginBottom: 0 }}>⚠️{t('pages.underContruction.title')}⚠️</h1>
          <p className="text-center">{t('pages.underContruction.sub')}</p>
        </div>
        <Button asChild variant="default" className="my-4">
          <Link href="/admin/login">{t('pages.underContruction.button')}</Link>
        </Button>
        <LocaleSelector />
      </div>
    </div>
  )
}
