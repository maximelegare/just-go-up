'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@app/utilities/cn'

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { type?: 'rule' | 'dots' }
>(({ className, type = 'rule', orientation = 'horizontal', decorative = true, ...props }, ref) => {
  return (
    <>
      {type === 'rule' ? (
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          className={cn(
            'shrink-0 bg-border',
            orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
            className,
          )}
          {...props}
        />
      ) : (
        <div className={cn('flex w-full justify-center gap-4 my-20', className)}>
          <span className="h-1 w-1 bg-foreground rounded-full"></span>
          <span className="h-1 w-1 bg-foreground rounded-full"></span>
          <span className="h-1 w-1 bg-foreground rounded-full"></span>
        </div>
      )}
    </>
  )
})
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
