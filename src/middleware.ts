import { i18nRouter } from 'next-i18n-router'
import i18nConfig from '../i18nConfig'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Keeps the url intact if the user is on the admin page
  if (req.url.includes('admin')) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }
  if (req.url.includes('monitoring')) {
    return NextResponse.redirect(new URL('/monitoring', req.url))
  }

  const i18Response = i18nRouter(req, i18nConfig)

  // Sets headers to access the pathname in ROOT layout
  i18Response.headers.set('x-pathname', req.nextUrl.pathname)
  i18Response.headers.set('x-fullpath', req.url)

  return i18Response
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next|admin).*)',
}
