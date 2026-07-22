import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected route patterns
const protectedRoutes = ['/admin', '/dashboard', '/portal']
const adminRoutes = ['/admin']
const authRoutes = ['/login', '/register', '/signup']

export async function proxy(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !session?.user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users from auth routes to dashboard
  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // For admin routes, check if user has admin role
  // Note: This is an optimistic check - always verify in the actual page/action
  if (isAdminRoute && session?.user) {
    // The actual role check happens in the page/component
    // This is just for early redirect if clearly not authorized
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
}
