"use client"
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPageOne,
  PaginationPrevious,
} from "@app/components/ui/pagination"
import { cn } from "@app/utilities/cn"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import React from "react"
import { PaginationSelectPageFromInput } from "../ui/paginationSelectPageWithInput"

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
}> = (props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = (page: number) => {
    const currentParams = searchParams.toString()
    const params = new URLSearchParams(currentParams)
    params.set("page", page.toString())

    // If there are existing params, append the new page param
    if (currentParams) {
      return `${pathname}?${params.toString()}`
    }
    // If no existing params, just add the page param
    return `${pathname}?page=${page}`
  }

  const { className, page, totalPages } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  return (
    <div className={cn("my-12 not-prose", className)}>
      <PaginationComponent>
        <PaginationContent>
          <div className="flex items-center justify-between w-full gap-2 flex-row">
            <PaginationItem>
              <PaginationPageOne
                disabled={page === 1}
                onClick={() => router.push(createQueryString(1))}
              />
            </PaginationItem>

            <div className="flex items-center">
              <PaginationItem>
                <PaginationPrevious
                  disabled={!hasPrevPage}
                  onClick={() => {
                    router.push(createQueryString(page - 1))
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  disabled={!hasNextPage}
                  onClick={() => {
                    router.push(createQueryString(page + 1))
                  }}
                />
              </PaginationItem>
            </div>
            <PaginationItem className="hidden sm:block">
              <PaginationSelectPageFromInput page={page} totalPages={totalPages} />
            </PaginationItem>
          </div>
          <div className="flex sm:hidden w-full justify-end mt-4 pr-[15px]">
            <PaginationItem>
              <PaginationSelectPageFromInput page={page} totalPages={totalPages} />
            </PaginationItem>
          </div>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
