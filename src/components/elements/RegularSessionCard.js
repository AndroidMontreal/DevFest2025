import TagsList from '@/components/elements/TagsList';
import SpeakersList from '@/components/elements/SpeakersList';
import CalendarButton from '@/components/elements/CalendarButton';
import { handleAddToCalendar } from '@/lib/generateGoogleCalendarUrl';

/**
 * Regular Session Card
 */
const RegularSessionCard = ({
  title,
  description,
  speakers,
  tags,
  time,
  eventDate,
  room,
  locale,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-200 ease-in hover:-translate-y-1.5 p-4 ring-2 ring-gray-300 sm:p-6 flex flex-col gap-3 relative group">
      <CalendarButton
        onClick={() =>
          handleAddToCalendar(title, description, time, eventDate, room)
        }
      />

      <h3 className="text-xl font-semibold text-gray-700 pr-12">{title}</h3>
      <p className="text-sm tracking-normal text-gray-500">{description}</p>

      <SpeakersList speakers={speakers} locale={locale} />
      <TagsList tags={tags} />
    </div>
  );
};

export default RegularSessionCard;
