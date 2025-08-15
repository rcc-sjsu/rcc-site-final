import { type NextRequest } from 'next/server';
import { updateSession } from '../../utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

// TODO:
// - use matcher config to target protected pages for auth (users need to be logged in to access protected pages)
// - middleware runs before requests so before user accesses a page, middleware runs (auth check for example)

// The matcher option allows you to target specific paths for the Middleware to run on.
// export const config = {
//   matcher: ['/about/:path*', '/dashboard/:path*'],
// }
