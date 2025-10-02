'use client';
import Image from 'next/image';
import logo from '@/public/images/logo/devFestLogoHorizontal.svg';
import Link from 'next/link';
import Navbar from '@/components/elements/Navbar';
import MobileDrawer from '@/components/elements/MobileDrawer';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import PillButton from '@/components/elements/PillButton';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/elements/LanguageSwitcher';
import { useParams, usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navigation.header');
  const { lang } = useParams();

  return (
    <header className="sticky top-0 z-50 mt-0 px-3">
      <div className="bg-white container mx-auto flex items-center justify-between rounded-b-2xl pt-3 ">
        <div className="bg-gray-50 container mx-auto flex items-center justify-between p-5 rounded-2xl shadow-md">
          {/* Logo and other elements on the left */}
          <div className="flex items-center space-x-3">
            <Link href={`/${lang}`}>
              <Image
                src={logo}
                width={280}
                alt="DevFest Montréal 2025 Header Logo"
                priority={true}
              />
            </Link>
          </div>

          <div className="flex flex-row space-x-3">
            {/* Navigation (Desktop) on the right */}
            <Navbar isMobile={false} />
            <LanguageSwitcher />

            <PillButton
              className="ml-3 hidden lg:flex"
              href={t('ticketButtonLink')}
              label={t('ticketButtonText')}
            />
          </div>
          {/* Hamburger Menu (Mobile) */}
          <button
            className="lg:hidden text-gray-800 hover:text-black focus:outline-none p-2 hover:bg-gray-200 rounded-full"
            onClick={() => setIsMenuOpen(true)}
            role="button"
            aria-label="menu"
            aria-pressed="false"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/*App Drawer overlay background*/}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* App Drawer (Mobile) */}
        <MobileDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
