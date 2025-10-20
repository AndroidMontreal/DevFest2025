import Image from 'next/image';
import Link from 'next/link';

/**
 * ScheduleSpeakerInfo component displays a clickable speaker card
 * that redirects to the speaker's detail page
 */
const ScheduleSpeakerInfo = ({ speaker, locale = 'en' }) => {
  const { uuid, name, title, slug, image } = speaker;

  return (
    <Link
      href={`/${locale}/speakers/${slug}`}
      className="flex items-center gap-3 mt-1 rounded-md  p-2 -ml-2 transition-all duration-200 group "
      title={`${name} - ${title}`}
    >
      <Image
        className="h-11 w-11 rounded shadow object-cover group-hover:shadow-md group-hover:scale-[105%]  transition-all duration-200 ease-in"
        src={image}
        alt={name}
        width={44}
        height={44}
      />
      <div>
        <p className="text-base font-semibold tracking-normal text-gray-800 group-hover:text-blue-800 transition-colors duration-200">
          {name}
        </p>
        <p className="text-xs text-gray-500">{title}</p>
      </div>
    </Link>
  );
};

export default ScheduleSpeakerInfo;
