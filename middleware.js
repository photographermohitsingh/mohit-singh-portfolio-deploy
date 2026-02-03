import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // If user tries to go to /admin
  if (path.startsWith('/admin')) {
    const token = request.cookies.get('admin_token');
    
    // If no token, kick them to login page
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: '/admin/:path*',
};