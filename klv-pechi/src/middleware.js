import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  const u = process.env.BASIC_AUTH_USER;
  const p = process.env.BASIC_AUTH_PASS;
  if (!u || !p) return NextResponse.next();

  const auth = req.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme?.toLowerCase() === 'basic') {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');
      if (user === u && pass === p) return NextResponse.next();
    }
  }
  return new NextResponse('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}

export const config = { matcher: ['/admin/:path*'] };
