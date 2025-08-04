import type { ButtonProps } from "@app/components/ui/button"

import { buttonVariant, buttonVariants } from "@app/components/ui/button"
import { cn } from "@app/utilities/cn"
import { ArrowRight, ArrowLeft, ChevronLeft } from "lucide-react"
import * as React from "react"
// import { useTranslate } from 'ROOT/locales/i18n.client'

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav aria-label="pagination" className={cn("mx-auto", className)} role="navigation" {...props} />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => <ul className={cn("w-full", className)} ref={ref} {...props} />,
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li className={cn("", className)} ref={ref} {...props} />,
)
PaginationItem.displayName = "PaginationItem"

type ButtonVariant = keyof typeof buttonVariant

type PaginationLinkProps = {
  variant?: ButtonVariant
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  variant,
  ...props
}: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        size,
        variant: variant ? variant : isActive ? "outline" : "ghost",
      }),
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 pl-2.5", className)}
      size="sm"
      variant="outline"
      {...props}
    >
      <ArrowLeft className="text-lg" />
      {/* <span>{t('blocks.itemsList.pagination.previous')}</span> */}
    </PaginationLink>
  )
}
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationPageOne = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink
      aria-label="Go to page 1"
      className={cn("gap-1 pl-2.5", className)}
      size="sm"
      variant="outline"
      {...props}
    >
      <ChevronLeft className="text-lg" />
      <span>Go to page 1</span>
    </PaginationLink>
  )
}
PaginationPageOne.displayName = "PaginationPageOne"

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => {
  // const { t } = useTranslate()

  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 pr-2.5", className)}
      size="sm"
      {...props}
    >
      {/* <span>{t('blocks.itemsList.pagination.next')}</span> */}
      <span>Next Page</span>
      <ArrowRight className="text-lg" />
    </PaginationLink>
  )
}
PaginationNext.displayName = "PaginationNext"

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationPageOne,
}
