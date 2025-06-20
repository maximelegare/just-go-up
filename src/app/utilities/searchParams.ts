import { Link as LinkType } from '@payload-types'
import { parse } from 'search-params'
import { safeEncode } from '@app/utilities/safeEncode'
import { safeDecode } from '@app/utilities/safeDecode'
import { Locale, locales } from 'ROOT/locales/locales'

export type SearchParams = LinkType['link']['searchParams']['params']

type Args = {
  url: string
  params: SearchParams
  options?: {
    toggleOnClick?: boolean
  }
}

export const getSearchParams = ({ params, url, options }: Args) => {
  if (!params || params.length === 0 || !url) {
    return { url, params: {}, stringParams: '' }
  }

  const splitCurrentUrl = url?.split('?')
  const baseUrl = splitCurrentUrl[0] // Base
  const currUrlParams = splitCurrentUrl[1] // Params

  /*
    Sets up an Array for params & an Object to check quickly if the param exists
  */
  const targetUrlParamsObj: Record<string, string> =
    currUrlParams?.length > 0 ? parse(currUrlParams) : {}

  const targetUrlParams = currUrlParams?.split('&') || []

  const removeParam = (key: string, idx: number) => {
    targetUrlParams.splice(idx, 1)
    delete targetUrlParamsObj[key]
  }

  const addParam = (key: string, value: string, type?: string) => {
    /*
      Check in String[] if a param exists (structure: ["key=value"])
      Updates the value if it exists (even `${key}=${type ? type + ":" : ""}${value}`if it's the same)
    */
    const fullParam = `${key}=${type ? type + ':' : ''}${value}`
    const encodedFullParam = safeEncode(fullParam)

    if (targetUrlParams.some((el) => el.startsWith(`${key}=`))) {
      const paramIndex = targetUrlParams.findIndex((el) => el.startsWith(`${key}=`))
      const encodedTargetUrlParam = safeEncode(targetUrlParams[paramIndex])

      /* 
        Remove the param if the Parameters are set on Toggle
        Remplace it if it already exists
      */
      if (options?.toggleOnClick) {
        if (encodedTargetUrlParam === encodedFullParam) {
          removeParam(key, paramIndex)
        } else {
          targetUrlParams[paramIndex] = safeDecode(fullParam)
        }
      } else {
        targetUrlParams[paramIndex] = safeDecode(fullParam)
      }

      /*
        Push to Array if it doesn't exist (If it is not set on Toggle) 
      */
    } else {
      targetUrlParams.push(safeDecode(fullParam))
    }
    /*
      Add to object if Params are not set on Toggle
    */
    targetUrlParamsObj[key] = `${type ? type + ':' : ''}${value}`
  }

  /*
    Format the params to work more easily with it.
  */
  params.forEach(({ key: paramKey, value: { collectionData }, value }) => {
    if (paramKey || value) {
      if (typeof paramKey === 'object') {
        /*
          They both need to be if statements because if collectionData is not set, it is an empty object.
        */
        if (typeof value?.collectionData === 'object') {
          Object.entries(collectionData).forEach(([key, val]) => {
            if (key !== 'type' && typeof val === 'object') {
              addParam(paramKey.slug, val.slug, key)
            }
          })
        }
        if (typeof value?.custom?.value === 'object') {
          addParam(paramKey?.slug, value?.custom?.value?.slug)
        }
      }
    }
  })

  /*
    Prevents to join if there is only one value.
  */
  const retParams = targetUrlParams.length === 1 ? targetUrlParams[0] : targetUrlParams.join('&')

  return {
    url: baseUrl && `${baseUrl}${targetUrlParams.length > 0 && '?'}${retParams}`,
    stringParams: retParams,
    params: targetUrlParamsObj,
  }
}

export const getSearchParamsFromURL = (fullPath: string): URLSearchParams | null => {
  if (!fullPath) return null

  const url = new URL(fullPath, process.env.PAYLOAD_PUBLIC_SERVER_URL)
  const params = new URLSearchParams(url.search)
  return params
}

type GetUrlData = {
  url: URL
  locale: Locale
  pathnameWithoutLocale: string
}

export const getUrlData = (fullPath: string): GetUrlData => {
  try {
    const urlData = new URL(fullPath, process.env.PAYLOAD_PUBLIC_SERVER_URL)

    const filterLocales = () => {
      const splitUrl = urlData.pathname.split('/')

      const url = splitUrl.reduce<string[]>((acc, value) => {
        if (value === '') return acc

        const isLocale = locales.some((locale) => locale.locale === value)
        if (isLocale) return acc

        acc.push(value)
        return acc
      }, [])

      return url.join('/')
    }

    return {
      url: urlData,
      locale: urlData.pathname.split('/')[1] as Locale,
      pathnameWithoutLocale: `/${filterLocales()}`,
    }
  } catch (err) {
    console.log(err, 'wrong url format')
  }
}
