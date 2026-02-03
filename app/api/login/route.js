import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { password } = await request.json();

  if (password === process.env.ADMIN_PASSWORD) {
    // FIX: We must 'await' cookies() before using it
    const cookieStore = await cookies();
    
    cookieStore.set('admin_token', 'secure-token-123', { 
      maxAge: 86400,
      path: '/', // Ensure cookie works on all pages
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}