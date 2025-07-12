import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  const token = request.cookies.get('refreshToken')?.value;

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
    '/notification',
    '/resume/:path*',
    '/interview/saved',
    '/my',
  ],
};
