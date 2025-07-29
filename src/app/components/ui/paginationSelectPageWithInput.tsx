"use client"
import React, { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { cn } from "@app/utilities/cn"

export const PaginationSelectPageFromInput = ({
  className,
  page,
  totalPages,
  ...props
}: React.ComponentProps<"div"> & { page: number; totalPages: number }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [inputValue, setInputValue] = useState(page.toString())

  // Update local input value when page prop changes (e.g., via buttons)
  useEffect(() => {
    setInputValue(page.toString())
  }, [page])

  const createQueryString = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    return `${pathname}?${params.toString()}`
  }

  const goToPage = () => {
    const parsed = parseInt(inputValue, 10)
    if (!isNaN(parsed)) {
      const clamped = Math.max(1, Math.min(totalPages, parsed))
      if (clamped !== page) {
        router.push(createQueryString(clamped))
      }
    } else {
      // Reset input to current page if invalid
      setInputValue(page.toString())
    }
  }

  return (
    <div
      aria-hidden
      className={cn("flex gap-1 items-center justify-center text-sm", className)}
      {...props}
    >
      <span>Page</span>
      <input
        type="number"
        className="w-14 px-1 py-0.5 border rounded text-center focus:border-accent focus:border-2  outline-none"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value) // Allow "" (clearing the field)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            goToPage()
          }
        }}
        onBlur={goToPage}
        min={1}
        max={totalPages}
      />
      <span>of</span>
      <span>{totalPages}</span>
    </div>
  )
}
