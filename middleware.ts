import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("admin_session")?.value;
  const valid = !!session && session === process.env.ADMIN_SESSION_SECRET;

  if (pathname === "/admin/login") {
    if (valid) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (!valid) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
