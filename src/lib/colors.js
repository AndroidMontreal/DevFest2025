// Centralized color palette for consistent theming

/**
 * Color palette for tip cards and badges
 * Each color has a light background (100) and dark text (800)
 */
export const COLOR_PALETTE = [
  { bg: 'bg-blue-100', text: 'text-blue-800' },
  { bg: 'bg-orange-100', text: 'text-orange-800' },
  { bg: 'bg-purple-100', text: 'text-purple-800' },
  { bg: 'bg-red-100', text: 'text-red-800' },
  { bg: 'bg-green-100', text: 'text-green-800' },
  { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  { bg: 'bg-pink-100', text: 'text-pink-800' },
  { bg: 'bg-sky-100', text: 'text-sky-800' },
  { bg: 'bg-teal-100', text: 'text-teal-800' },
  { bg: 'bg-indigo-100', text: 'text-indigo-800' },
];

/**
 * Get color combination for a given index
 * Cycles through the palette if index exceeds palette length
 * @param {number} index - Index to get color for
 * @returns {object} Object with bg and text color classes
 */
export const getColorForIndex = (index) => {
  return COLOR_PALETTE[index % COLOR_PALETTE.length];
};

/**
 * Get random color from palette
 * @returns {object} Object with bg and text color classes
 */
export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLOR_PALETTE.length);
  return COLOR_PALETTE[randomIndex];
};

/**
 * Get alternating rotation class based on index
 * Even indices rotate left, odd indices rotate right
 * @param {number} index - Index to determine rotation
 * @returns {string} Tailwind rotation class
 */
export const getRotationForIndex = (index) => {
  return index % 2 === 0 ? '-rotate-1' : 'rotate-1';
};

// Default export
export default COLOR_PALETTE;
