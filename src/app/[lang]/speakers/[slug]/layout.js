import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;

  const t = await getTranslations('speaker');
  const speakers = Array.isArray(t.raw('speakers')) ? t.raw('speakers') : [];
  const speaker = speakers.find((s) => s.slug === slug);

  return {
    title: `${speaker?.name} | DevFest Montreal 2025`,
    description: speaker?.shortBio,
    openGraph: {
      images: [speaker?.image],
    },
  };
}

export default async function SpeakerDetailsLayout({ children, params }) {
  const { lang } = await params;
  setRequestLocale(lang);
  return children;
}
