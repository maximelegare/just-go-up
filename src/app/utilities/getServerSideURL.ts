import { headers } from 'next/headers'
import canUseDOM from './canUseDOM'

export const getServerSideURL = async (type: 'fullpath' | 'pathname') => {
  if (!canUseDOM) {
    const headersList = await headers()
    return headersList.get(`x-${type}`) || ''
  } else {
    throw new Error("getServerSideURL can't be used on the client side")
  }
}
