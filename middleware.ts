import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (process.env.NODE_ENV === 'production') {
    if (pathname.startsWith('/interview')) {
      return NextResponse.redirect(new URL('/to-be-continued', request.url));
    }

    const token = request.cookies.get('refreshToken')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login-required', request.url));
    }
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
    '/interview/:path*',
    '/my',
  ],
};
