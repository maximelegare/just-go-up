import { cn } from '@app/utilities/cn'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const textTransitions = 'text-button-foreground  transition-all ease-in-out duration-300'

export const buttonVariant = {
  default: 'bg-primary hover:bg-primary/90 hover:text-primary-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  ghost: 'hover:bg-card text-foreground',
  link: '',
  outline: 'border border-border bg-background hover:bg-card text-foreground',
  text: 'px-0 py-0 h-8',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  underline: 'px-0 py-2',
  iconOnly: 'w-fit h-fit p-0',
  menu: 'tracking-[0.15em] rounded-sm px-3 text-sm font-medium outline-none border-none flex items-center',
}

export const buttonVariantActif = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  ghost: 'hover:bg-card text-foreground',
  link: 'text-foreground',
  text: 'text-foreground',
  outline: 'border border-border bg-background hover:bg-card text-foreground',
  secondary: 'bg-secondary hover:bg-secondary/80',
  underline: 'px-0 py-2',
  iconOnly: 'w-fit h-fit p-0',
  menu: 'bg-muted',
}

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded  font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${textTransitions}`,
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded px-8',
        sm: 'h-9 rounded px-3 text-sm',
        xs: 'h-6 rounded px-3 text-xs',
      },
      variant: buttonVariant,
      variantActif: buttonVariantActif,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isActive?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, isActive, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          buttonVariants({
            className,
            size,
            variant,
            variantActif: isActive ? variant : undefined,
          }),
        )}
        ref={ref}
        {...props}
      ></Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
