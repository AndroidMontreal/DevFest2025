'use client';

import React from 'react';

// --- Helper function to parse time and create Google Calendar link ---
const generateGoogleCalendarLink = (item) => {
  const eventDate = '2025-11-01'; // The main date of your event

  // This function converts a time string like "9:30 AM" or "1:00 PM" to a 24-hour format "HH:MM".
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${String(hours).padStart(2, '0')}:${minutes || '00'}`;
  };

  // Split the time range string "9:30 AM - 10:00 AM" into start and end times.
  const timeParts = item.time.split(' - ');
  const startTimeStr = timeParts[0];
  // If there's no end time (e.g., "8:30 AM"), default it to one hour after the start.
  const endTimeStr = timeParts.length > 1 ? timeParts[1] : null;

  const startTime24 = parseTime(startTimeStr);

  let endTime24;
  if (endTimeStr) {
    endTime24 = parseTime(endTimeStr);
  } else {
    const [startHour, startMinute] = startTime24.split(':');
    const endDate = new Date(`${eventDate}T${startTime24}:00`);
    endDate.setHours(endDate.getHours() + 1);
    endTime24 = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
  }

  // Format dates into the UTC format required by Google Calendar (YYYYMMDDTHHMMSSZ)
  const formatToUTC = (dateStr) => {
    return new Date(dateStr).toISOString().replace(/-|:|\.\d+/g, '') + 'Z';
  };

  const startDate = `${eventDate}T${startTime24}:00`;
  const endDate = `${eventDate}T${endTime24}:00`;

  const dates = `${formatToUTC(startDate)}/${formatToUTC(endDate)}`;

  // Construct the final URL
  const url = new URL('https://www.google.com/calendar/render');
  url.searchParams.append('action', 'TEMPLATE');
  url.searchParams.append('text', item.title);
  url.searchParams.append('dates', dates);
  url.searchParams.append('details', item.description || '');
  url.searchParams.append('location', 'DevFest Montreal 2025');

  return url.toString();
};

const AddToCalendarButton = ({ item }) => {
  const calendarLink = generateGoogleCalendarLink(item);

  return (
    <a
      href={calendarLink}
      target="_blank"
      rel="noopener noreferrer"
      title="Add to Calendar"
      className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <line x1="12" x2="12" y1="14" y2="20" />
        <line x1="9" x2="15" y1="17" y2="17" />
      </svg>
    </a>
  );
};

export default AddToCalendarButton;
