import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  const isIndonesian = pathname === '/id' || pathname.startsWith('/id/');
  const locale = isIndonesian ? 'id' : 'en';
  requestHeaders.set('x-site-locale', locale);
  if (request.cookies.get('gcua-locale')?.value !== locale) {
    const response = NextResponse.redirect(request.nextUrl);
    response.cookies.set('gcua-locale', locale, { path: '/', sameSite: 'lax' });
    return response;
  }

  if (!isIndonesian) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const rewrittenUrl = request.nextUrl.clone();
  rewrittenUrl.pathname = pathname.replace(/^\/id(?=\/|$)/, '') || '/';
  return NextResponse.rewrite(rewrittenUrl, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
