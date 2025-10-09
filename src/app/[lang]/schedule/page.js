'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';

// --- Child Components ---

const SpeakerInfo = ({ name, title, image }) => (
  <div className="flex items-center gap-3 mt-4">
    <Image
      className="h-10 w-10 rounded-full object-cover"
      src={image}
      alt={name}
      width={40}
      height={40}
    />
    <div>
      <p className="text-base font-semibold text-gray-800">{name}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  </div>
);

const ScheduleItem = ({ item, isLast }) => {
  const { time, type, title, description, speakers } = item;

  // This card is used for special events, identified by the isSpecialEvent flag in your data.
  if (type === 'special') {
    return (
      <div className="grid grid-cols-[1.25rem_1fr] sm:grid-cols-[8rem_1.75rem_1fr] items-start">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-500 pt-1 whitespace-nowrap">
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
          <p className="block sm:hidden text-sm font-medium text-gray-500 mb-2">
            {time}
          </p>
          <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {description && (
              <p className="mt-1 text-base text-gray-600">{description}</p>
            )}
            {speakers && speakers.length > 0 && (
              <div className="flex flex-col gap-4 mt-2">
                {speakers.map((speaker) => (
                  <SpeakerInfo key={speaker.uuid} {...speaker} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // This is the default card for regular talks and workshops.
  return (
    <div className="grid grid-cols-[1.25rem_1fr] sm:grid-cols-[8rem_1.75rem_1fr] items-start">
      <div className="hidden sm:block text-right">
        <p className="text-sm font-medium text-gray-500 pt-1 whitespace-nowrap">
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
        <p className="block sm:hidden text-sm font-medium text-gray-500 mb-2">
          {time}
        </p>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="mt-1 text-base text-gray-600">{description}</p>
          <div className="flex flex-col gap-4">
            {speakers &&
              speakers.map((speaker) => (
                <SpeakerInfo key={speaker.uuid} {...speaker} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TrackSelector = ({ tracks, activeTrackName, setActiveTrackName }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const el = scrollContainerRef.current;
      if (el) {
        const hasOverflow = el.scrollWidth > el.clientWidth;
        setShowLeftArrow(hasOverflow && el.scrollLeft > 0);
        setShowRightArrow(
          hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1
        );
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScroll();
      scrollContainer.addEventListener('scroll', checkScroll, {
        passive: true,
      });
    }

    window.addEventListener('resize', checkScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [tracks]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="flex items-center justify-center w-full">
        <button
          onClick={() => scroll('left')}
          className={`p-2 transition-all ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <svg
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          className="flex-1 flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide px-2"
        >
          {tracks.map((track) => (
            <button
              key={track.uuid}
              onClick={() => setActiveTrackName(track.name)}
              className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-colors duration-200 flex-shrink-0 ${
                activeTrackName === track.name
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:text-blue-600'
              }`}
            >
              {track.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className={`p-2 transition-all ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <svg
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

// --- Main Schedule Page Component ---

export default function SchedulePage() {
  const t = useTranslations();
  const scheduleData = t.raw('schedule');
  const sessionsData = t.raw('session');
  const speakersData = t.raw('speaker');

  const [activeTrackName, setActiveTrackName] = useState(
    scheduleData.tracks[0].name
  );

  const scheduleItems = useMemo(() => {
    const currentTrack = scheduleData.tracks.find(
      (track) => track.name === activeTrackName
    );
    if (!currentTrack) return [];

    const sessionsMap = new Map(sessionsData.sessions.map((s) => [s.uuid, s]));
    const speakersMap = new Map(
      speakersData.speakers.map((sp) => [sp.uuid, sp])
    );

    return currentTrack.sessions.map((scheduledSession) => {
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

      const speakers = (sessionDetails.speakerUUID || [])
        .map((uuid) => speakersMap.get(uuid))
        .filter(Boolean);

      const isSpecialEvent = sessionDetails.isSpecialEvent === true;

      return {
        time: scheduledSession.time,
        title: sessionDetails.title,
        description:
          sessionDetails.shortDescription || sessionDetails.description,
        speakers: speakers,
        type: isSpecialEvent ? 'special' : 'talk',
      };
    });
  }, [activeTrackName, scheduleData, sessionsData, speakersData]);

  return (
    <div className="bg-white py-8 sm:py-16">
      <TitleWithSubtitle
        title={scheduleData.title}
        subTitle={scheduleData.description}
        titleClassName="max-w-2xl"
        subTitleClassName="max-w-xl"
      />
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="mb-10 sm:mb-16">
          <TrackSelector
            tracks={scheduleData.tracks}
            activeTrackName={activeTrackName}
            setActiveTrackName={setActiveTrackName}
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
      </div>
    </div>
  );
}
