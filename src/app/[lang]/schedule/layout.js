import { getPageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }) {
  const { lang } = await params;

  return getPageMetadata(lang, 'schedule');
}

export default function ScheduleLayout({ children }) {
  return <div className="">{children}</div>;
}
