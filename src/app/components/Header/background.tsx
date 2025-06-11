'use client'

import useDetectScroll, { Axis } from '@smakss/react-scroll-direction'
import React from 'react'
import { cn } from '@app/utilities/cn'

export const Background: React.FC<{ className?: string; show?: boolean }> = ({
  className,
  show: showFromProps,
}) => {
  const [show, setShow] = React.useState(showFromProps !== undefined ? showFromProps : false)

  const TOP_PX = 50
  const {
    scrollPosition: { top },
  } = useDetectScroll({ axis: Axis.Y })

  React.useEffect(() => {
    if (top > TOP_PX) setShow(true)
    else setShow(false)
  }, [top])

  return (
    <div
      className={cn(
        `absolute ease-in-out h-full transition-all duration-300 delay-150 z-40  w-full top-0 -translate-y-[100%]  bg-background left-0`,
        className,
        show && 'translate-y-0',
        showFromProps && 'translate-y-0',
      )}
    ></div>
  )
}
