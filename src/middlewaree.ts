// middleware.js
import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get("user");

  console.log(request.url)

    if (!userCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

  return NextResponse.next();
}

// Specify the routes to apply the middleware
export const config = {
  matcher: ["/:path*"], // Apply middleware to all routes under /dashboard
};