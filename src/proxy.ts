import { type NextRequest, NextResponse } from "next/server";

const TENANT_MATCHER = /^([a-z0-9_-]+)\.demo\..*$/;

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host");

  if (hostname) {
    const [, tenant] = TENANT_MATCHER.exec(hostname) ?? [];

    if (tenant) {
      const response = NextResponse.rewrite(
        new URL(
          `/${tenant}${request.nextUrl.pathname}`,
          request.nextUrl.origin,
        ),
      );

      response.headers.set("x-tenant", tenant);

      return response;
    }
  }

  return NextResponse.json(
    {
      error: "Tenant not found",
    },
    { status: 404 },
  );
}

export const config = {
  /**
   * Define the routes that should be handled by the middleware
   *
   * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
   */
  matcher: ["/((?!api|_next|__nextjs|images|favicon.ico).*)"],
};
