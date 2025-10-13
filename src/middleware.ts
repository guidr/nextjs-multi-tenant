import { type NextRequest, NextResponse } from 'next/server';

const TENANT_MATCHER = /^([a-z0-9_-]+)\.demo\..*$/;

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  
  if (hostname) {
    const [, tenant] = TENANT_MATCHER.exec(hostname) ?? [];
  
    if (tenant) {
      const response = NextResponse.rewrite(
        new URL(
          `/${tenant}${request.nextUrl.pathname}`, 
          request.nextUrl.origin,
        ),
      );

      response.headers.set('x-tenant', tenant);

      return response;
    }

    

    


    return NextResponse.json({
      hostname,
    });
  }

  // return NextResponse.json({
  //   headers: request.headers
  // });
}