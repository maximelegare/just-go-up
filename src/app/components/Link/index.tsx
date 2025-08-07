import { Button, type ButtonProps } from "@app/components/ui/button"
import { cn } from "@app/utilities/cn"
import Link from "next/link"
import React from "react"

import type { Page } from "@payload-types"

export type Appearance = "inline" | ButtonProps["variant"]

import { Icon, type IconName } from "../Icon"

import { Link as LinkType } from "@payload-types"
import { getUrlData, getSearchParams, getSearchParamsFromURL } from "@app/utilities/searchParams"
import { buttonsComponentsMap } from "@app/_Map/buttons.map"

export type SearchParams = LinkType["link"]["searchParams"]

export type CMSLinkType = {
  icon?: {
    type?: IconName
    className?: string
    position?: "right" | "left"
  }
  appearance?: Appearance
  children?: React.ReactNode
  className?: string
  label?: string
  newTab?: boolean | null
  reference?: {
    relationTo: "pages" | "posts"
    value: Page | string
  } | null
  size?: ButtonProps["size"] | null
  type?: LinkType["link"]["type"] | null
  url?: string | null
  searchParams?: SearchParams
  isActive?: LinkType["link"]["isActive"]
  isCurrentlySelected?: boolean
  currentUrl: string
  justifyContent?: ButtonProps["justifyContent"] | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = "inline",
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    searchParams,
    isActive,
    currentUrl,
    isCurrentlySelected,
    justifyContent,
  } = props

  const href =
    type === "reference" && typeof reference?.value === "object" && reference.value.slug
      ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
          reference.value.slug
        }`
      : url

  const { url: urlWithParams, params: linkParams } = getSearchParams({
    url: type === "current" ? currentUrl : url || href,
    params: searchParams?.params,
    options: { toggleOnClick: searchParams?.toggleOnClick },
  })

  if (!urlWithParams) return null

  const currentUrlParams = getSearchParamsFromURL(currentUrl)

  const size = appearance === "link" ? "clear" : sizeFromProps
  const newTabProps = newTab ? { rel: "noopener noreferrer", target: "_blank" } : {}

  const getIsActive = (currentUrl: string): boolean => {
    if (!currentUrl) return false
    else if (isActive === "never") return false
    else if (isActive === "default") {
      /*
        Highlights the active link based on the page, not the params
      */
      const currUrlPathname = getUrlData(currentUrl).url.pathname
      if (href === currUrlPathname || url === currUrlPathname) return true

      /*
        Prevents the links that don't contain a show param from always getting highlighted
      */
      if (!linkParams?.show && !currentUrlParams?.get("show")) return false
      else if (!linkParams?.show && currentUrlParams?.get("show")) return false
      /*
       Checks if all the params in the link are included in the current URL
      */
      return Object.entries(linkParams).every(([key, val]) => currentUrlParams.get(key) === val)
    } else if (isActive === "exact" && currentUrl === urlWithParams) {
      // return true
    } else return false
  }

  /*
   Ensure we don't break any styles set by richText
  */
  if (appearance === "inline") {
    return (
      <Link
        className={cn("relative group no-underline prose", className)}
        href={urlWithParams}
        {...newTabProps}
      >
        <span className={cn("font-normal w-full inline-flex items-center tracking-[0.1em]")}>
          {label && label}
          {children && children}
          <Icon name="radix/arrow-right" className="text-xs" />
        </span>
        <LineUnderButton baseWidth={"w-0"} className="mt-4" />
      </Link>
    )
  }

  const ButtonComponents: React.FC<CMSLinkType> =
    buttonsComponentsMap[appearance] ?? buttonsComponentsMap["base"]

  return (
    <Button
      asChild
      className={cn(className, "group")}
      size={size}
      justifyContent={justifyContent}
      variant={appearance}
      isActive={getIsActive(currentUrl) || isCurrentlySelected}
    >
      <Link
        className={cn("relative no-underline prose", className)}
        href={urlWithParams}
        {...newTabProps}
      >
        <ButtonComponents {...props} />
      </Link>
    </Button>
  )
}

const LineUnderButton = ({
  baseWidth,
  isActive,
  className,
}: {
  baseWidth: string
  isActive?: boolean
  className?: string
}) => (
  <span
    className={cn(
      `absolute  bottom-[-3px] left-0 h-[1px] bg-accent transition-all duration-300 ${baseWidth}`,
      isActive ? "w-full" : "group-hover:w-full",
      className,
    )}
  ></span>
)
