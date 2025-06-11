'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '@app/utilities/cn'

type ThumbProps = {
  className?: string
  width?: 'thin' | 'normal'
  length?: 'full' | '1/2'
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    orientation?: 'vertical' | 'horizontal'
    thumb?: ThumbProps
  }
>(({ className, style, children, orientation = 'vertical', thumb, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    scrollHideDelay={999999999}
    ref={ref}
    className={cn('relative', className)}
    style={style}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar forceMount orientation={orientation} thumb={thumb} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
    thumb?: ThumbProps
  }
>(
  (
    {
      className,
      orientation = 'vertical',
      thumb: { width, className: thumbClassName, length = 'full' } = {},
      ...props
    },
    ref,
  ) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' &&
          `${width === 'thin' ? 'w-1.5 ' : 'w-2.5'} ${length === 'full' ? 'h-full' : 'h-1/2'}  border-l border-l-transparent p-[1px]`,
        orientation === 'horizontal' &&
          `${width === 'thin' ? 'h-[4px]' : 'h-1.5'} ${length === 'full' ? 'w-full' : 'w-1/2 translate-x-1/2 left-1/2'} translate-y-[3rem]  bg-muted  flex-col  border-t-transparent  absolute rounded-full`,
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn(['relative flex-1 rounded-full bg-muted', thumbClassName])}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  ),
)
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
