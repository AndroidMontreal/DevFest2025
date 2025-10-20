import React, { useEffect, useRef, useState } from 'react';

/**
 * `scrollContainerRef` is a ref used to access the DOM element that contains the track buttons.
 * This allows for direct manipulation of the scroll position to implement the left/right scroll arrows.
 *
 * `showLeftArrow` and `showRightArrow` are state variables that control the visibility of the
 * scroll navigation arrows. They are updated based on the scroll position and overflow of the track container.
 */
const TrackSelector = ({ tracks, activeTrackName, onTrackChange }) => {
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
      <div className="flex items-center justify-center w-full my-2">
        <button
          onClick={() => scroll('left')}
          className={`p-2 transition-all ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <svg
            className="h-6 w-6 text-blue-800"
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
          className="flex-1 flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide px-2 py-3"
        >
          {tracks.map((track) => (
            <button
              key={track.uuid}
              onClick={() => onTrackChange(track.uuid)}
              className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-colors duration-200 flex-shrink-0 cursor-pointer ${
                activeTrackName === track.name
                  ? 'bg-blue-600 text-blue-50 shadow-md'
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
export default TrackSelector;
