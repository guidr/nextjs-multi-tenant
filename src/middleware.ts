import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)

  const host = request.headers.get('host')
  if (host?.includes('tenant-a')) {
    requestHeaders.set('x-tenant', 'tenant-a')  
  } else if (host?.includes('tenant-b')) {
    requestHeaders.set('x-tenant', 'tenant-b')
  } else {
    requestHeaders.set('x-tenant', 'default')
  }

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  })
}