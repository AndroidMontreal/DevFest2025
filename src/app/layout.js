import '@/styles/globals.css';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  weight: ['400', '700'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

export const metadata = {
  title: 'DevFest Montreal 2025',
  description:
    'The biggest Google Developer Group community-run developer event in Montreal',
};

export default function RootLayout({ children }) {
  return (
    <html className={openSans.className}>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
