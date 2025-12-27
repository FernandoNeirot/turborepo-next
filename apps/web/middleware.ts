import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session_token');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  
 if (isDashboardPage && !session) {
   return NextResponse.redirect(new URL('/forbidden', request.url));
 }

  return NextResponse.next();
}

export const config = {
  matcher: ['/characters/:path*','/dashboard/:path*', '/login'],
};