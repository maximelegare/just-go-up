import { Separator } from '@app/components/ui/seperator'
import React from 'react'

export const NoHero: React.FC = () => {
  return (
    <div className="container w-full justify-center">
      <div className="h-24 w-full"></div>
      <Separator className="container mb-4" />
    </div>
  )
}
