import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TrackSelector from '@/components/elements/TrackSelector';
import ScheduleItem from '@/components/elements/ScheduleItem';
import { getIcon } from '@/lib/icons';
import { getColorForIndex, getRotationForIndex } from '@/lib/colors';

const QuickTips = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-white  rounded-2xl p-6 lg:p-8 lg:sticky lg:top-8 overflow-hidden shadow">
      <h2 className="text-xl font-bold text-gray-900 mb-1">{tips.title}</h2>
      <p className="text-sm text-gray-600 mb-6">{tips.subtitle}</p>

      <div className="flex flex-col gap-5">
        {tips.items.map((tip, index) => {
          const IconComponent = getIcon(tip.icon);
          const colors = getColorForIndex(index);
          const rotation = getRotationForIndex(index);

          return (
            <div
              key={index}
              className={`flex  items-start gap-3 rounded-xl px-4 py-3 group transition-all duration-300 ease-in-out ${colors.bg} ${colors.text} ${rotation} hover:rotate-0 hover:scale-[1.02] hover:shadow-md`}
            >
              <div className="mt-0.5 flex-shrink-0 group-hover:rotate-6 transition-all duration-300">
                {IconComponent && <IconComponent size={21} />}
              </div>
              <span className="text-sm font-medium leading-relaxed flex-1">
                {tip.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function ScheduleContent() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const scheduleData = t.raw('schedule');
  const sessionsData = t.raw('session');
  const speakersData = t.raw('speaker');

  const trackParam = searchParams.get('track');
  const tracks = scheduleData.tracks;
  const quickTips = scheduleData.quickTips;

  const activeTrack = useMemo(() => {
    if (trackParam) {
      const foundTrack = tracks.find((t) => t.uuid === trackParam);
      if (foundTrack) return foundTrack;
    }
    return tracks[0];
  }, [trackParam, tracks]);

  const handleTrackChange = (trackUuid) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('track', trackUuid);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const sessions = sessionsData.sessions;
  const speakers = speakersData.speakers;

  const scheduleItems = useMemo(() => {
    if (!activeTrack) return [];

    const sessionsMap = new Map(sessions.map((s) => [s.uuid, s]));
    const speakersMap = new Map(speakers.map((sp) => [sp.uuid, sp]));

    return activeTrack.sessions.map((scheduledSession) => {
      const sessionDetails = sessionsMap.get(scheduledSession.sessionUUID);

      if (!sessionDetails) {
        return {
          time: scheduledSession.time,
          title: 'Session details not found',
          description: '',
          speakers: [],
          type: 'talk',
        };
      }

      const sessionSpeakers = (sessionDetails.speakerUUID || [])
        .map((uuid) => speakersMap.get(uuid))
        .filter(Boolean);

      const isSpecialEvent = sessionDetails.isSpecialEvent === true;

      return {
        time: scheduledSession.time,
        title: sessionDetails.title,
        description:
          sessionDetails.shortDescription || sessionDetails.description,
        speakers: sessionSpeakers,
        type: isSpecialEvent ? 'special' : 'talk',
      };
    });
  }, [activeTrack, sessions, speakers]);

  return (
    <div className="py-8 sm:py-16">
      <TitleWithSubtitle
        title={scheduleData.title}
        subTitle={scheduleData.description}
        titleClassName="max-w-2xl"
        subTitleClassName="max-w-xl"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
          {/* Left side - Schedule */}
          <div className="min-w-0">
            <div className="mb-10 sm:mb-16">
              <TrackSelector
                tracks={scheduleData.tracks}
                activeTrackName={activeTrack.name}
                onTrackChange={handleTrackChange}
              />
            </div>

            <div>
              {scheduleItems.length > 0 ? (
                scheduleItems.map((item, index) => (
                  <ScheduleItem
                    key={`${item.title}-${index}`}
                    item={item}
                    isLast={index === scheduleItems.length - 1}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No sessions available for this track.
                </p>
              )}
            </div>

            {/*/!* Mobile Insider Tips - Shows below schedule on mobile *!/*/}
            {/*{quickTips && (*/}
            {/*  <div className="mt-12 ">*/}
            {/*    <QuickTips tips={quickTips} />*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>

          {/* Right side - Insider Tips (Desktop only) */}
          {quickTips && (
            <div className="lg:block">
              <QuickTips tips={quickTips} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
