import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const locales = ['fr', 'en']
const defaultLocale = 'fr'

export default auth((req) => {
    const { pathname } = req.nextUrl

    // --- Auth protection for /admin ---
    if (pathname.startsWith('/admin')) {
        if (!req.auth?.user) {
            const loginUrl = new URL('/login', req.nextUrl.origin)
            loginUrl.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(loginUrl)
        }
        // User is authenticated, allow access
        return NextResponse.next()
    }

    // --- i18n locale routing ---
    // Skip for API routes, static files, and auth
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/login') ||
        pathname.includes('.') ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml'
    ) {
        return NextResponse.next()
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return NextResponse.next()

    // Redirect to default locale
    const locale = defaultLocale
    return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, req.url)
    )
})

export const config = {
    matcher: [
        // Match all paths except static files and images
        '/((?!_next/static|_next/image|favicon.ico|uploads|images).*)',
    ],
}
