export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*'],
      },
    ],
    sitemap: 'https://devfest.gdgmontreal.com//sitemap.xml',
    host: 'https://devfest.gdgmontreal.com/',
  };
}
