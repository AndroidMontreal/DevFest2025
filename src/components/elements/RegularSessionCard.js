import TagsList from '@/components/elements/TagsList';
import SpeakersList from '@/components/elements/SpeakersList';
import CalendarButton from '@/components/elements/CalendarButton';
import { handleAddToCalendar } from '@/lib/generateGoogleCalendarUrl';
import { LuExternalLink } from 'react-icons/lu';
import Link from 'next/link';

/**
 * RSVP Button Component
 */
const RSVPButton = ({ rsvpLink, rsvpButtonText }) => {
  if (!rsvpLink) return null;

  return (
    <Link
      href={rsvpLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 font-medium text-sm rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md w-fit"
    >
      <span>{rsvpButtonText || 'RSVP'}</span>
      <LuExternalLink size={16} />
    </Link>
  );
};

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
  rsvpLink,
  rsvpButtonText,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl active:shadow-xl transition-all duration-200 ease-in active:-translate-y-1.5 hover:-translate-y-1.5 p-4 ring-2 ring-gray-300 sm:p-6 flex flex-col gap-3 relative group">
      <CalendarButton
        onClick={() =>
          handleAddToCalendar(title, description, time, eventDate, room)
        }
      />

      <h3 className="text-xl font-semibold text-gray-700 pr-12">{title}</h3>
      <p className="text-sm tracking-normal text-gray-500">{description}</p>

      {/* RSVP Button - Post DevFest Hide it */}
      {/*<RSVPButton rsvpLink={rsvpLink} rsvpButtonText={rsvpButtonText} />*/}

      <SpeakersList speakers={speakers} locale={locale} />
      <TagsList tags={tags} />
    </div>
  );
};

export default RegularSessionCard;
