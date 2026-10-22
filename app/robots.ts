// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/account/'], //hypotheticals
    },
    sitemap: 'https://REPLACE_THIS.com/sitemap.xml',
  }
}
