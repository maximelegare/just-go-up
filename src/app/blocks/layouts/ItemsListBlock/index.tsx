import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { ItemsList } from '@app/blocks/layouts/ItemsListBlock/ItemsList'
import { BigTitle } from '@app/components/BigTitle'
import { Pagination } from '@app/components/Pagination'

import type { Page } from '@payload-types'
import { Locale } from 'ROOT/locales/locales'
import { OptionsBar } from '@app/components/OptionsBar'

export type ItemsListBlockProps = Extract<Page['layout'][0], { blockType: 'itemsList' }>

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
    limit,
    layout,
    hasPagination,
    urlSearchParams,
    bigTitle,
    imageSelector,
    optionsBar,
    featured,
    populateBy,
  } = props

  const pageNumber = urlSearchParams.page ? parseInt(urlSearchParams?.page) : undefined

  /*
    Used to extract and format the URL search-param
    format => filter=category:sleeves
  */
  const filterUrlParam = urlSearchParams?.filter
  const filterValues = filterUrlParam?.includes(':') ? filterUrlParam?.split(':') : filterUrlParam

  const payload = await getPayload({ config: configPromise })
  const getSearchParamWhere = (field: string, equals: string) => {
    switch (relationTo) {
      case 'variants':
        return {
          [`${field}.slug`]: {
            equals: equals,
          },
        }
      case 'products':
        return {
          [`variants.${field}.slug`]: {
            equals: equals,
          },
        }
      default:
        return {}
    }
  }

  const getWhere = () => {
    switch (relationTo) {
      case 'variants': // Checks if the variant and the products are actives
        return {
          isActive: {
            equals: true,
          },
          'products.isActive': {
            equals: true,
          },
        }
      case 'products': // Checks if the products and the variants are actives
        return {
          isActive: {
            equals: true,
          },
          'variants.isActive': {
            equals: true,
          },
        }
      case 'blogs': {
        return {
          isActive: {
            equals: true,
          },
        }
      }
      default:
        return {}
    }
  }

  /*
    Used to get only an Array of Ids of all the products
  */
  const featuredIds = featured[featured.relationTo]?.map((el) => el.id) || []

  const fetchedItems = await payload.find({
    locale: props.params?.locale,
    collection: populateBy === 'collection' ? relationTo : featured.relationTo,
    limit: limit ?? undefined,
    ...(filterValues && filterValues[0] && filterValues[1] // Used to fetch based on the Url search-param
      ? {
          where: getSearchParamWhere(
            filterValues && filterValues[0],
            filterValues && filterValues[1],
          ),
        }
      : {}),
    ...(populateBy === 'featured' && featuredIds // Used to fetch based on the items present in featured
      ? {
          where: {
            _id: {
              in: featuredIds,
            },
          },
        }
      : {}),
    where: getWhere(),
    page: pageNumber,
  })

  let bigTitleSub: string | undefined

  // if (categoryUrlParam) {
  //   const fetchedBigTitleSubtitle = await payload.find({
  //     locale: props.params?.locale,
  //     select: {
  //       title: true,
  //     },
  //     collection: 'categories',
  //     limit: 1,
  //     where: {
  //       slug: {
  //         equals: categoryUrlParam,
  //       },
  //     },
  //   })
  //   bigTitleSub = fetchedBigTitleSubtitle.docs[0]?.title
  // }

  // if (fabricUrlParam) {
  //   const fetchedBigTitleSubtitle = await payload.find({
  //     locale: props.params?.locale,
  //     select: {
  //       title: true,
  //     },
  //     collection: 'fabrics',
  //     limit: 1,
  //     where: {
  //       slug: {
  //         equals: fabricUrlParam,
  //       },
  //     },
  //   })
  //   bigTitleSub = fetchedBigTitleSubtitle.docs[0]?.title
  // }

  return (
    <div className="mb-12">
      <BigTitle subtitle={bigTitleSub} {...bigTitle} className="mb-[2rem]" />
      {/* {hasPagination && (
        <div className="container mb-8">
          <PageRange
            collection={relationTo}
            currentPage={fetchedItems.page}
            limit={limit}
            totalDocs={fetchedItems.totalDocs}
          />
        </div>
      )} */}
      <div className="container">
        <OptionsBar data={optionsBar} locale={props.params.locale} className="mb-4" />
        <ItemsList
          relationTo={populateBy === 'collection' ? relationTo : featured.relationTo}
          items={fetchedItems.docs as any}
          layout={layout}
          imageSelector={imageSelector}
        />
      </div>
      {hasPagination && fetchedItems.totalPages > 1 && fetchedItems.page && (
        <div className="container">
          <Pagination page={fetchedItems.page} totalPages={fetchedItems.totalPages} />
        </div>
      )}
    </div>
  )
}
