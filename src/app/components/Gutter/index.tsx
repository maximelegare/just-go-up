import { cn } from "@app/utilities/cn"
import React from "react"

export const gutterOptions = {
  small: "mx-4",
  medium: "mx-8",
  large: "mx-16",
  container: "container",
  none: "",
}

type GutterType = {
  gutter?: keyof typeof gutterOptions
  children: React.ReactElement | React.ReactNode
  className?: string
}

export const Gutter: React.FC<GutterType> = ({ children, gutter = "none", className }) => {
  return <div className={cn(gutterOptions[gutter], className)}>{children}</div>
}
