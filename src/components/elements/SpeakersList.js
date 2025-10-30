import ScheduleSpeakerInfo from '@/components/elements/ScheduleSpeakerInfo';

/**
 * Shared Speakers Component
 */
const SpeakersList = ({ speakers, locale }) => {
  if (!speakers || speakers.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {speakers.map((speaker) => (
        <ScheduleSpeakerInfo
          key={speaker.uuid}
          speaker={speaker}
          locale={locale}
        />
      ))}
    </div>
  );
};
export default SpeakersList;
