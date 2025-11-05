'use client';
import { useTranslations } from 'next-intl';
import PillButton from '@/components/elements/PillButton';

export const SessionInfo = ({ session, index }) => {
  // Get schedule data from translations
  const s = useTranslations('schedule');
  const tracks = Array.isArray(s.raw('tracks')) ? s.raw('tracks') : [];

  // Variables to hold the found room name and time string.
  let roomName = null;
  let timeString = null;

  // Loop through each track (e.g., "The Workshop Hub") in your schedule.
  for (const track of tracks) {
    // Inside each track, find the session that matches the current session's UUID.
    const sessionInTrack = track.sessions.find(
      (s) => s.sessionUUID === session.uuid
    );

    // If a match is found, store its room name and time, then stop looping.
    if (sessionInTrack) {
      roomName = track.name;
      timeString = sessionInTrack.time;
      break;
    }
  }

  // If the session UUID isn't found anywhere in the schedule, render nothing.
  // This prevents errors if a session is defined but not yet scheduled.
  if (!roomName) {
    return null;
  }

  return (
    <div key={session.uuid} id="sessionDetails" className="prose">
      <h3 className="text-[min(7vw,25px)] leading-[1.3] tracking-tight font-semibold text-[#2480F0] mt-6 mb-0">
        {session.title}
      </h3>
      <div className="flex mb-2">
        {/*Temporary comment*/}
        <p className="text-gray-600 mt-2 mb-2 text-sm font-semibold ">
          {roomName} ({timeString})
        </p>
      </div>
      <div className="prose lg:prose-base">
        {session.description.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {/* RSVP Button - Post DevFest Hide it */}

      {/*{session.rsvpLink && (<div className="mt-4">*/}
      {/*  <PillButton*/}
      {/*    className="my-6 flex no-underline"*/}
      {/*    label={session.rsvpButtonText}*/}
      {/*    href={session.rsvpLink}*/}
      {/*  />*/}

      {/*</div>)}*/}
    </div>
  );
};
