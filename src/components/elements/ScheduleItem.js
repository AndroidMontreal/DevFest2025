import ScheduleSpeakerInfo from '@/components/elements/ScheduleSpeakerInfo';
import COLOR_PALETTE, { getColorForIndex } from '@/lib/colors';

/**
 * Renders a single schedule item, which can be a special event or a regular session.
 * It displays the time, title, description, and speaker information.
 */
const ScheduleItem = ({ item, isLast }) => {
  const { time, type, title, description, speakers } = item;
  const colors = getColorForIndex(
    Math.floor(Math.random() * COLOR_PALETTE.length)
  );

  if (type === 'special') {
    return (
      <div className="grid grid-cols-[1.25rem_1fr] sm:grid-cols-[12rem_1.75rem_1fr] items-start">
        <div className="hidden sm:block text-right">
          <p className="text-base font-semibold text-gray-500 pt-1 whitespace-nowrap">
            {time}
          </p>
        </div>
        <div className="relative h-full">
          {!isLast && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
          )}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-200 ring-4 ring-white z-10"></div>
        </div>
        <div className="pb-12">
          <p className="block sm:hidden text-sm font-semibold text-gray-500 mb-2">
            {time}
          </p>
          <div className={`bg-gray-50 rounded-lg p-4 sm:p-6 shadow`}>
            <h3 className="text-xl font-bold text-gray-700">{title}</h3>
            {description && (
              <p className="mt-1 text-base text-gray-600">{description}</p>
            )}
            {speakers && speakers.length > 0 && (
              <div className="flex flex-col gap-4 mt-2">
                {speakers.map((speaker) => (
                  <ScheduleSpeakerInfo key={speaker.uuid} {...speaker} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1.25rem_1fr] sm:grid-cols-[12rem_1.75rem_1fr] items-start">
      <div className="hidden sm:block text-right">
        <p className="text-base  font-semibold text-gray-500 pt-1 whitespace-nowrap">
          {time}
        </p>
      </div>
      <div className="relative h-full">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-200 ring-4 ring-white z-10"></div>
      </div>
      <div className="pb-12">
        <p className="block sm:hidden text-base  font-semibold text-gray-500 mb-2">
          {time}
        </p>
        <div
          className={`bg-gray-50 rounded-lg shadow p-4 sm:p-6 flex flex-col gap-3`}
        >
          <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
          <p className="mt-1 text-base text-gray-500">{description}</p>

          <div className="flex flex-row gap-2 flex-wrap">
            {speakers &&
              speakers.map((speaker) => (
                <ScheduleSpeakerInfo key={speaker.uuid} {...speaker} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScheduleItem;
