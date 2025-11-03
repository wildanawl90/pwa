import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /login)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/offline']
  const isPublicPath = publicPaths.includes(path)

  // If accessing a public path, allow it
  if (isPublicPath) {
    return NextResponse.next()
  }

  // For all other paths, check if user is authenticated
  // In a real app, you'd check for a session token or cookie
  // For now, we'll check for a simple auth cookie
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true'

  if (!isAuthenticated) {
    // Redirect to login page with the current path as redirect
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  // User is authenticated, allow the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js (service worker)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sw.js).*)',
  ],
}
