// src/lib/icons.js
// Centralized icon mapping for the entire application

import {
  LuCalendar,
  LuCamera,
  LuClock,
  LuCoffee,
  LuDownload,
  LuGift,
  LuGlobe,
  LuHash,
  LuLightbulb,
  LuMail,
  LuMapPin,
  LuMegaphone,
  LuMessageCircle,
  LuPhone,
  LuStar,
  LuTarget,
  LuTicketCheck,
  LuTrophy,
  LuUserRoundCheck,
  LuUsers,
  LuUtensils,
  LuWifi,
  LuZap,
} from 'react-icons/lu';
import { GiPumpkinLantern } from 'react-icons/gi';
import { FaRegIdBadge } from 'react-icons/fa6';
import { CgNotes } from 'react-icons/cg';
import { MdOutlineFastfood } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';

/**
 * Icon registry for the application
 * Maps string identifiers to React Icon components
 *
 * Usage:
 * import { getIcon, ICON_NAMES } from '@/lib/icons';
 * const Icon = getIcon('clock');
 * <Icon size={20} />
 */
export const ICON_REGISTRY = {
  // Event & Schedule icons
  home: AiOutlineHome,
  target: LuTarget,
  clock: LuClock,
  calendar: LuCalendar,
  pumpkin: GiPumpkinLantern,
  keynote: CgNotes,
  team: LuUsers,
  schedule: LuCalendar,
  speakers: LuUserRoundCheck,
  ticket: LuTicketCheck,
  // People & Networking
  language: LuGlobe,
  registration: FaRegIdBadge,
  users: LuUsers,
  message: LuMessageCircle,
  phone: LuPhone,
  mail: LuMail,

  // Items & Actions
  download: LuDownload,
  utensils: LuUtensils,
  coffee: LuCoffee,
  gift: LuGift,
  camera: LuCamera,
  lunch: MdOutlineFastfood,

  // Tech & Features
  wifi: LuWifi,
  zap: LuZap,
  hash: LuHash,
  megaphone: LuMegaphone,

  // Motivation & Tips
  lightbulb: LuLightbulb,
  trophy: LuTrophy,
  star: LuStar,
  raffles: CgNotes,
  // Location
  map: LuMapPin,
};

/**
 * Get icon component by name
 * @param {string} iconName - Name of the icon from ICON_REGISTRY
 * @returns {React.Component|null} Icon component or null if not found
 */
export const getIcon = (iconName) => {
  return ICON_REGISTRY[iconName] || null;
};

/**
 * Available icon names (for TypeScript/documentation)
 */
export const ICON_NAMES = Object.keys(ICON_REGISTRY);

/**
 * Check if icon exists
 * @param {string} iconName - Name to check
 * @returns {boolean}
 */
export const hasIcon = (iconName) => {
  return iconName in ICON_REGISTRY;
};

// Export the registry as both named and default
export { ICON_REGISTRY as default };
