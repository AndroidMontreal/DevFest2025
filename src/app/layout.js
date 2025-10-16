import '@/styles/globals.css';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  weight: ['400', '700'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});
const siteUrl = 'https://devfest.gdgmontreal.com';
const siteTitle = 'DevFest Montreal 2025';
const siteDescription =
  'The biggest Google Developer Group community-run developer event in Montreal';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      fr: '/fr',
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    images: [`${siteUrl}/images/logo/eventHeader.jpg`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html className={openSans.className}>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
