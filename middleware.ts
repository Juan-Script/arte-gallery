import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session'
import { SessionData } from '@/lib/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Deja pasar la página de login
  if (pathname === '/admin/login') return NextResponse.next()

  // Protege todo /admin/*
  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next()
    const session = await getIronSession<SessionData>(request, response, {
      password: process.env.SESSION_SECRET as string,
      cookieName: 'admin_session',
    })

    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
