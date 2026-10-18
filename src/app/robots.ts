import type { MetadataRoute } from 'next';

// served at /robots.txt: crawl the public site, but skip the API, the sign-in flow, members-only pages, and the
// utility pages that only make sense mid-flow
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/', '/privateCheck', '/auth-error', '/check-email', '/error'],
    },
  };
}
