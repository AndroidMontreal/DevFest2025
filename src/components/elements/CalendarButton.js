import { LuCalendarPlus } from 'react-icons/lu';

/**
 * Calendar Button Component
 */
const CalendarButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200 z-10 cursor-pointer"
    aria-label="Add to calendar"
    title="Add to calendar"
  >
    <LuCalendarPlus
      size={20}
      className="hover:scale-110 hover:rotate-6 transition-transform duration-200"
    />
  </button>
);

export default CalendarButton;
