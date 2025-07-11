import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login-required', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/my/:path*',
    '/competition/entry',
    '/service/:path*',
    '/oauth/callback/:path*',
    '/notification',
    '/resume/:path*',
    '/interview/saved',
    '/my',
  ],
};
