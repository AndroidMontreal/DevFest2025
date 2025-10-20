import { getIcon } from '@/lib/icons';
import SpeakersList from '@/components/elements/SpeakersList';
import TagsList from '@/components/elements/TagsList';

/**
 * Special Event Card
 */
const SpecialEventCard = ({
  title,
  description,
  speakers,
  tags,
  icon,
  locale,
}) => {
  const IconComponent = icon ? getIcon(icon) : null;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-200 ease-in hover:-translate-y-1.5 p-4 ring-2 ring-gray-300 sm:p-6 relative overflow-hidden group">
      <div className="pr-12">
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        {description && (
          <p className="mt-2 text-base text-gray-600">{description}</p>
        )}
      </div>

      <SpeakersList speakers={speakers} locale={locale} />
      <TagsList tags={tags} />

      {IconComponent && (
        <div className="absolute -bottom-4 right-2 opacity-5 group-hover:rotate-3 group-hover:scale-110 transition-all duration-200">
          <IconComponent size={98} />
        </div>
      )}
    </div>
  );
};
export default SpecialEventCard;
