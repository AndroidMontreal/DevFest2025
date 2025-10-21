import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TrackSelector from '@/components/elements/TrackSelector';
import ScheduleItem from '@/components/elements/ScheduleItem';
import QuickTips from '@/components/elements/QuickTips';

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
        icon: sessionDetails.icon,
        tags: sessionDetails.tags,
        rsvpLink: sessionDetails.rsvpLink,
        rsvpButtonText: sessionDetails.rsvpButtonText,
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
                    room={activeTrack.name}
                    eventDate={scheduleData?.date}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No sessions available for this track.
                </p>
              )}
            </div>
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
