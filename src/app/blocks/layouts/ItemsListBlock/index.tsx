import configPromise from "@payload-config"
import { getPayload } from "payload"
import React from "react"

import { ItemsList } from "@app/blocks/layouts/ItemsListBlock/ItemsList"
import { Pagination } from "@app/components/Pagination"

import type { Blog, Category, Link, Page } from "@payload-types"
import { Locale } from "ROOT/locales/locales"
import { OptionsBar } from "@app/components/OptionsBar"

import { searchParamKeysToFields } from "@app/_Map/searchParamKeysToFields.map"
import { PageRange } from "@app/components/PageRange"

export type ItemsListBlockProps = Extract<Page["layout"][0], { blockType: "itemsList" }>

export const ItemsListBlock: React.FC<
  ItemsListBlockProps & {
    id?: string
    urlSearchParams?: Record<string, string>
    params?: {
      locale?: Locale
    }
  }
> = async (props) => {
  const {
    relationTo,
    cardVariant,
    limit,
    layout,
    hasPagination,
    urlSearchParams,
    imageSelector,
    optionsBar,
    featured,
    populateBy,
    specificList,
  } = props

  const pageNumber = urlSearchParams?.page ? parseInt(urlSearchParams?.page) : 1

  /*
    Used to extract and format the URL search-param
    format => filter=category:sleeves
  */
  const filterUrlParam = urlSearchParams?.filter
  const filterValues = filterUrlParam?.includes(":") ? filterUrlParam?.split(":") : filterUrlParam

  const payload = await getPayload({ config: configPromise })
  const getSearchParamWhere = (field: string, equals: string) => {
    switch (relationTo) {
      case "blogs": {
        return {
          [`${searchParamKeysToFields[field]}.slug`]: {
            equals: equals,
          },
        }
      }
      default:
        return {}
    }
  }

  const getSpecificListIds = (items: Blog[] | Category[] | Link[]) => items?.map((i) => i.id) || []

  const getWhere = (
    r: typeof specificList.relationTo | typeof relationTo | typeof featured.relationTo,
  ) => {
    switch (r) {
      case "blogs": {
        const ids = getSpecificListIds(specificList.blogs as Blog[])

        return {
          isActive: {
            equals: true,
          },
          ...(populateBy === "featured" && {
            isFeatured: {
              equals: true,
            },
          }),
          ...(populateBy === "specificList" && {
            _id: {
              in: ids,
            },
          }),
        }
      }
      case "categories": {
        const ids = getSpecificListIds(specificList.categories as Category[])
        return {
          ...(populateBy === "featured" && {
            isFeatured: {
              equals: true,
            },
          }),
          ...(populateBy === "specificList" && {
            _id: {
              in: ids,
            },
          }),
        }
      }
      case "links": {
        const ids = getSpecificListIds(specificList.links as Link[])

        return {
          ...(populateBy === "specificList" && {
            _id: {
              in: ids,
            },
          }),
        }
      }
      default:
        return {}
    }
  }

  const getRelationTo = () => {
    switch (populateBy) {
      case "collection":
        return relationTo
      case "featured":
        return featured.relationTo
      case "specificList":
        return specificList.relationTo
    }
  }

  const fetchedItems = await payload.find({
    locale: props.params?.locale,
    collection: getRelationTo(),
    limit: limit ?? undefined,
    where: {
      and: [
        getWhere(getRelationTo()),
        filterValues ? getSearchParamWhere(filterValues[0], filterValues[1]) : {},
      ],
    },
    page: pageNumber,
  })

  return (
    <div className="mb-12">
      <div className="">
        <OptionsBar data={optionsBar} locale={props.params.locale} className="mb-4" />
        {hasPagination && (
          <div className="my-2">
            <PageRange
              category={
                filterValues && typeof filterValues[1] === "string" ? filterValues[1] : "All"
              }
              collection={relationTo}
              currentPage={fetchedItems.page}
              limit={limit}
              totalDocs={fetchedItems.totalDocs}
            />
          </div>
        )}
        <ItemsList
          relationTo={populateBy === "collection" ? relationTo : featured.relationTo}
          items={fetchedItems.docs as any}
          layout={layout}
          imageSelector={imageSelector}
          cardVariant={cardVariant}
        />
      </div>
      {hasPagination && fetchedItems.totalPages > 1 && fetchedItems.page && (
        <div className="">
          <Pagination page={fetchedItems.page} totalPages={fetchedItems.totalPages} />
        </div>
      )}
    </div>
  )
}
