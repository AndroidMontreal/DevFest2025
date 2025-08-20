'use client';
import Link from 'next/link';
import SocialLinks from '@/components/elements/SocialLinks';
import Image from 'next/image';
import logo from '@/public/images/logo/gdg_mtl_footer.png';
import { useTranslations } from 'next-intl';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'next/navigation';
import { CiCircleChevRight } from 'react-icons/ci';

const Footer = () => {
  const t = useTranslations('navigation.footer');
  const { lang } = useParams();

  const quickLinksWithUUIDs =
    t.raw('quickLinks.links') &&
    t.raw('quickLinks.links').map((link) => ({
      ...link,
      uuid: uuidv4(),
    }));

  return (
    <footer className="bg-black bg-opacity-90 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:place-items-start lg:justify-items-center">
          {/* Column 1: Logo, Description and Social */}
          <div className="space-y-4 md:px-2 ">
            <Link href={`/${lang}`}>
              <Image
                src={logo}
                width={280}
                alt="DevFest Montréal 2025 Footer Logo"
                priority={true}
              />
            </Link>
            <p className="text-sm text-gray-400 leading-normal pt-3">
              {t('description')}
            </p>

            <p className="text-xs text-gray-400 italic pt-1">
              © {new Date().getFullYear()} {t('copyrightTitle')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2 md:px-2">
            <h3 className="text-md tracking-normal">{t('quickLinks.title')}</h3>
            <ul className="space-y-1">
              {quickLinksWithUUIDs.map((link) => (
                <li key={link.uuid}>
                  <Link
                    key={link.uuid}
                    href={link.newWindow ? link.href : `/${lang}${link.href}`}
                    className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                    target={link.newWindow ? '_blank' : '_self'}
                    rel={link.newWindow ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Join us */}
          <div className="space-y-2 md:px-2">
            <div className="space-y-2">
              <h3 className="text-md">{t('joinus.title')}</h3>
              <p className="text-sm text-gray-400 leading-normal mb-2">
                {t('joinus.description')}
              </p>
              <div className="pt-2">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
