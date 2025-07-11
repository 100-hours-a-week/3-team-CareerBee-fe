import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken')?.value;
  console.log('📦 쿠키에 있는 refreshToken:', token);

  if (!token) {
    console.log('❌ 토큰이 없어서 /login-required 로 이동');
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
