import ScheduleSpeakerInfo from '@/components/elements/ScheduleSpeakerInfo';

/**
 * Shared Speakers Component
 */
const SpeakersList = ({ speakers, locale }) => {
  if (!speakers || speakers.length === 0) return null;

  return (
    <div className="flex flex-row gap-1 flex-wrap mt-2">
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
