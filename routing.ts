import { defineRouting } from 'next-intl/routing'
import { getPathname } from 'next-intl/navigation'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['es', 'it', 'en'],

  // Used when no locale matches
  defaultLocale: 'es',

  pathnames: {
    '/': '/',
    '/about': {
      es: '/sobre-nosotros',
      it: '/chi-siamo',
      en: '/about'
    },
    '/mission': {
      es: '/mision',
      it: '/missione',
      en: '/mission'
    },
    '/contact': {
      es: '/contacto',
      it: '/contatti',
      en: '/contact'
    },
    '/blog': {
      es: '/blog',
      it: '/blog',
      en: '/blog'
    },
    '/blog/[slug]': {
      es: '/blog/[slug]',
      it: '/blog/[slug]',
      en: '/blog/[slug]'
    },
    '/admin': {
      es: '/admin',
      it: '/admin',
      en: '/admin'
    },
    '/login': {
      es: '/login',
      it: '/login',
      en: '/login'
    }
  }
})

export function getLocalizedPathname<Pathname extends keyof typeof routing.pathnames>(
  pathname: Pathname,
  locale: (typeof routing.locales)[number]
): string {
  const pathnames = routing.pathnames[pathname]

  if (typeof pathnames === 'string') {
    return pathnames
  }

  return pathnames?.[locale] || String(pathname)
}
