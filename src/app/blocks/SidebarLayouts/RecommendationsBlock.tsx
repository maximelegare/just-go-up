import React from 'react'

// import { DisplayDate } from '@app/components/Date'
import { cn } from '@app/utilities/cn'
import { Icon } from '@app/components/Icon'
import { Separator } from '@app/components/ui/separator'

import { CategoryLabel } from '@app/components/CategoryLabel'

// type Props = {
//   // data:Blog
// }

export const RecommendationsBlock: React.FC = () => {
  // const {title, subtitle, createdAt} = data

  return (
    <section className="flex flex-col items-start">
      <div className={cn('flex items-center gap-2')}>
        <Icon name="radix/calendar" className="text-[0.5em]" />
        <div className="text-xs">12 juin 2025</div>
      </div>

      <h4 className="!mt-2">This is an interesting article about something</h4>
      <div className="flex gap-1 mt-4">
        <CategoryLabel text="Climbing gear" />
        <CategoryLabel text="Training" />
      </div>
      <Separator />
    </section>
  )
}
