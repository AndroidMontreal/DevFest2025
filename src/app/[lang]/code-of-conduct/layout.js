import { getPageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }) {
  const { lang } = await params;

  return getPageMetadata(lang, 'code-of-conduct');
}

export default function TeamLayout({ children }) {
  return <div>{children}</div>;
}
