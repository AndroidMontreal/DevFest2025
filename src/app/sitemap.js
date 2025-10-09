// app/sitemap.js

// Note: We no longer need 'fs' or 'path' with this new approach.

export default async function sitemap() {
  const baseUrl = 'https://devfest.gdgmontreal.com'; // Use your actual domain

  // --- Load data using dynamic imports ---
  // This is the recommended Next.js way to handle JSON files in server-side code.
  // Make sure your path alias '@' is configured to point to your project's root,
  // or adjust the path accordingly (e.g., '../../locales/en/speaker.json').
  const enSpeakersData = await import('@/locales/en/speaker.json');
  const frSpeakersData = await import('@/locales/fr/speaker.json');
  const enSessionsData = await import('@/locales/en/session.json');
  const frSessionsData = await import('@/locales/fr/session.json');

  const enSpeakers = enSpeakersData.speakers;
  const frSpeakers = frSpeakersData.speakers;
  const enSessions = enSessionsData.sessions;
  const frSessions = frSessionsData.sessions;

  // --- Static routes ---
  // These are the main pages of your site
  const staticRoutes = [
    { url: `${baseUrl}/en`, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/fr`, lastModified: new Date(), priority: 1.0 },
    {
      url: `${baseUrl}/en/code-of-conduct`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/code-of-conduct`,
      lastModified: new Date(),
      priority: 0.8,
    },
    { url: `${baseUrl}/en/team`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/fr/team`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/en/speakers`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/fr/speakers`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/en/schedule`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/fr/schedule`, lastModified: new Date(), priority: 0.9 },
  ];

  // --- Dynamic Speaker Routes ---
  const enSpeakerRoutes = enSpeakers.map((speaker) => ({
    url: `${baseUrl}/en/speakers/${speaker.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const frSpeakerRoutes = frSpeakers.map((speaker) => ({
    url: `${baseUrl}/fr/speakers/${speaker.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // --- Dynamic Session Routes ---
  // It's a good practice to have individual pages for sessions as well
  const enSessionRoutes = enSessions.map((session) => ({
    url: `${baseUrl}/en/sessions/${session.uuid}`, // Using UUID for session pages
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const frSessionRoutes = frSessions.map((session) => ({
    url: `${baseUrl}/fr/sessions/${session.uuid}`, // Using UUID for session pages
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Combine all static and dynamic routes
  return [
    ...staticRoutes,
    ...enSpeakerRoutes,
    ...frSpeakerRoutes,
    ...enSessionRoutes,
    ...frSessionRoutes,
  ];
}

// Required for `output: 'export'`
export function generateStaticParams() {
  return [{ __metadata_id__: ['sitemap.xml'] }];
}
