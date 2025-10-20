/**
 * Generate Google Calendar URL
 */
export const generateGoogleCalendarUrl = (
  title,
  description,
  timeRange,
  date,
  location
) => {
  const formatDateForGoogle = (dateStr, timeStr) => {
    const [time, period] = timeStr.trim().split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');

    return `${dateStr.replace(/-/g, '')}T${formattedHours}${formattedMinutes}00`;
  };

  const [startTime, endTime] = timeRange.split('-').map((t) => t.trim());
  const startDateTime = formatDateForGoogle(date, startTime);
  const endDateTime = formatDateForGoogle(date, endTime);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description || '',
    dates: `${startDateTime}/${endDateTime}`,
    location: location || '',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * Handle calendar action
 */
export const handleAddToCalendar = (
  title,
  description,
  timeRange,
  date,
  location
) => {
  const calendarUrl = generateGoogleCalendarUrl(
    title,
    description,
    timeRange,
    date,
    location
  );
  window.open(calendarUrl, '_blank');
};
