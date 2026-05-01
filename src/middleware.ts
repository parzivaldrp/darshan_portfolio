import { NextResponse, type NextRequest } from 'next/server';

/**
 * Edge middleware for the portfolio.
 *
 * Why this exists
 * ----------------
 * The /Admin route lets the site owner edit project data via the
 * admin panel. Without protection, *anyone* who visits /Admin can
 * create, edit, or delete the project list — there is no client-side
 * auth and the API routes don't gate writes on identity.
 *
 * Adding a visible login page to a portfolio site looks weird and
 * confuses recruiters. So instead of a custom auth UI, this middleware
 * gates ONLY the /Admin paths with HTTP Basic Auth, which uses the
 * browser's native credential dialog. The rest of the portfolio stays
 * 100% public. Visitors hitting any other page see no login UI at all
 * and have no idea an admin panel exists.
 *
 * Credentials live in environment variables:
 *   ADMIN_USERNAME
 *   ADMIN_PASSWORD
 *
 * Set them in `.env.local` for development and on Vercel
 * (Project → Settings → Environment Variables) for production.
 *
 * Note: Basic Auth is fine for a single-user admin panel like this.
 * Don't use it for multi-user systems — there's no logout, no per-user
 * audit, and no MFA. For a portfolio admin, that's a non-issue.
 */
export function middleware(req: NextRequest) {
  // Read the Authorization header. If absent or wrong, demand credentials.
  const auth = req.headers.get('authorization');
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  // Fail closed: if env vars aren't configured, the admin panel is
  // unreachable. Better to lock yourself out and notice than to ship
  // with a default password.
  if (!expectedUser || !expectedPass) {
    return new NextResponse(
      'Admin credentials not configured on the server.',
      { status: 503 }
    );
  }

  if (auth) {
    // "Basic <base64('user:pass')>"
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      // atob is available on the edge runtime.
      const decoded = atob(encoded);
      const sep = decoded.indexOf(':');
      const user = sep >= 0 ? decoded.slice(0, sep) : decoded;
      const pass = sep >= 0 ? decoded.slice(sep + 1) : '';

      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    }
  }

  // Demand credentials. The browser shows its native popup automatically
  // when it sees this header.
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Portfolio admin", charset="UTF-8"',
    },
  });
}

export const config = {
  // Only run on Admin paths AND on the admin-only API routes.
  // Public site (/), /About, /Project, /Contact, etc. are untouched —
  // they're publicly readable. Project CRUD endpoints we DO gate, so
  // someone who finds /api/createProject can't write directly either.
  matcher: [
    '/Admin',
    '/Admin/:path*',
    '/api/createProject',
    '/api/editProject/:path*',
    '/api/deleteProject/:path*',
    '/api/addProject/:path*',
  ],
};
