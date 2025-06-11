'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@app/utilities/cn'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'relative  inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-lg border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed  data-[state=checked]:bg-[var(--theme-elevation-800)] data-[state=unchecked]:bg-[var(--theme-elevation-100)]',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'absolute pointer-events-none block h-5 w-5 rounded-lg bg-[var(--theme-elevation-0)] shadow-lg ring-0 data-[state=checked]:right-0 data-[state=unchecked]:left-0',
      )}
    />
  </SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
