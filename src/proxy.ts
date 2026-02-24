// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionResponse = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  let session = null;
  if (sessionResponse.ok) {
    const contentType = sessionResponse.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      session = await sessionResponse.json();
    }
  }

  const isAuthPage =
    pathname.includes("/auth/sign-in") || pathname.includes("/auth/sign-up");

  const isAdminPage = pathname.includes("/admin");

  if (isAuthPage && session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log(session?.user?.role);
  if (isAdminPage) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    if (session?.user?.role === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // আপনার matcher অবশ্যই ফোল্ডার স্ট্রাকচারের সাথে মিলতে হবে
  matcher: ["/auth/sign-in", "/auth/sign-up", "/admin"],
};
