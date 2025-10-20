'use client';

import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n';
import ICON_REGISTRY, { getIcon } from '@/lib/icons';

// The actual switcher component that uses useSearchParams
function LanguageSwitcherContent() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const IconComponent = getIcon('language');

  // Get the alternative locale
  const alternativeLocale = locales.find((locale) => locale !== currentLocale);

  const redirectedPathName = (locale) => {
    if (!pathName) return '/';

    const segments = pathName.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');

    // Preserve query parameters (like ?track=xxx)
    const queryString = searchParams.toString();
    return queryString ? `${newPath}?${queryString}` : newPath;
  };

  return (
    <div className="flex items-center">
      {alternativeLocale && (
        <Link
          href={redirectedPathName(alternativeLocale)}
          className="text-gray-800 px-4 py-2 text-md flex items-center gap-1 hover:text-black hover:bg-gray-200 rounded-full sm:hover:ring-gray-500 sm:hover:ring-1"
        >
          {IconComponent && <IconComponent size={20} strokeWidth={2} />}

          {alternativeLocale.toUpperCase()}
        </Link>
      )}
    </div>
  );
}

// Main component with Suspense wrapper
const LanguageSwitcher = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center">
          <div className="text-gray-800 px-4 py-2 text-md">...</div>
        </div>
      }
    >
      <LanguageSwitcherContent />
    </Suspense>
  );
};

export default LanguageSwitcher;
