'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useMemo, useState, useEffect } from 'react'

export const useClientSideUrl = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  return useMemo(() => {
    const query = searchParams.toString()
    const path = query ? `${pathname}?${query}` : pathname
    return origin ? `${origin}${path}` : ''
  }, [pathname, searchParams, origin])
}
