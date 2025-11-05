import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useTranslations } from 'next-intl';
import { LuUsers, LuCalendar, LuMic } from 'react-icons/lu';
import { getIcon } from '@/lib/icons';

const Navbar = ({ isMobile }) => {
  const pathname = usePathname();
  const { lang } = useParams();

  const t = useTranslations('navigation.header');

  const headerNavigationWithUUIDs = Array.isArray(t.raw('headerNavigation'))
    ? t.raw('headerNavigation').map((nav) => ({
        ...nav,
        uuid: uuidv4(),
      }))
    : [];

  // Normalize pathname by removing the locale prefix
  const normalizedPathname =
    pathname.replace(new RegExp(`^/${lang}`), '') || '/';

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={
        isMobile
          ? 'flex flex-col space-y-2'
          : 'hidden lg:flex space-x-2 items-center'
      }
    >
      {headerNavigationWithUUIDs.map((link) => {
        const isActive =
          normalizedPathname === link.href ||
          (normalizedPathname === '/' && link.href === '/') ||
          (link.href !== '/' && normalizedPathname.startsWith(link.href));

        const IconComponent = getIcon(link.icon);

        return (
          <Link
            key={link.uuid}
            href={link.newWindow ? link.href : `/${lang}${link.href}`}
            target={link.newWindow ? '_blank' : '_self'}
            rel={link.newWindow ? 'noopener noreferrer' : undefined}
            className={`
              flex items-center gap-1
              text-gray-900
              px-3
              py-2
              text-md
              hover:text-gray-900
              hover:bg-gray-200
              hover:ring-1
              hover:ring-gray-600
              transition-all
              hover:shadow-sm
              duration-200
              ease-in
              ${!isMobile && 'rounded-full'}
              ${isActive ? 'bg-gray-200 text-gray-900 sm:ring-gray-600 sm:ring-1' : ''} 
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            {IconComponent && <IconComponent size={20} strokeWidth={2} />}
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
