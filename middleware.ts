import { NextRequest, NextResponse } from 'next/server'

// Protected routes that require authentication
const PROTECTED_ROUTES = ['/admin', '/api/admin', '/api/posts/create', '/api/posts/update']

// Admin-only routes
const ADMIN_ROUTES = ['/admin/dashboard', '/api/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route is protected
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))

  if (!isProtected) {
    return NextResponse.next()
  }

  // Get token from cookie or header
  const token = request.cookies.get('firebase-token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    // Redirect to login for protected routes
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Return 401 for API routes
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  // For admin routes, verify the token has admin role
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route))

  if (isAdminRoute) {
    // This would be verified by the backend API route
    // For now, just ensure token exists
    if (!token) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }
  }

  // Add custom headers for logging
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-forwarded-for', request.ip || 'unknown')
  requestHeaders.set('x-requested-at', new Date().toISOString())

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/posts/create',
    '/api/posts/update/:path*'
  ]
}
