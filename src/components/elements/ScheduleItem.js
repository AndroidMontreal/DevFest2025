import { useLocale } from 'next-intl';
import SpecialEventCard from '@/components/elements/SpecialEventCard';
import RegularSessionCard from '@/components/elements/RegularSessionCard';

/**
 * Shared Timeline Component
 */
const Timeline = ({ isLast }) => (
  <div className="relative h-full hidden sm:block">
    {!isLast && (
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
    )}
    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-200 z-10"></div>
  </div>
);

/**
 * Shared Time Display
 */
const TimeDisplay = ({ time }) => (
  <>
    <div className="hidden sm:block text-right">
      <p className="text-base font-semibold text-gray-500 pt-1 whitespace-nowrap">
        {time}
      </p>
    </div>
    <p className="block sm:hidden text-sm sm:text-base font-semibold text-gray-500 mb-2">
      {time}
    </p>
  </>
);

/**
 * Main Schedule Item Component
 */
const ScheduleItem = ({ item, isLast, room, eventDate = '2025-11-01' }) => {
  const {
    time,
    type,
    title,
    description,
    speakers,
    tags,
    icon,
    rsvpLink,
    rsvpButtonText,
  } = item;
  const locale = useLocale();
  return (
    <div className="grid grid-cols-[1fr] sm:grid-cols-[9rem_1.75rem_1fr] items-start">
      <TimeDisplay time={time} />
      <Timeline isLast={isLast} />

      <div className="pb-12 md:pl-3">
        {type === 'special' ? (
          <SpecialEventCard
            title={title}
            description={description}
            speakers={speakers}
            tags={tags}
            icon={icon}
            locale={locale}
          />
        ) : (
          <RegularSessionCard
            title={title}
            description={description}
            speakers={speakers}
            tags={tags}
            time={time}
            eventDate={eventDate}
            room={room}
            locale={locale}
            rsvpLink={rsvpLink}
            rsvpButtonText={rsvpButtonText}
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleItem;
