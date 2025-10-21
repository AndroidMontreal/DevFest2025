import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { getIcon } from '@/lib/icons';
import { getColorForIndex, getRotationForIndex } from '@/lib/colors';

const QuickTips = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 lg:sticky lg:top-8 overflow-hidden shadow-md ring-2 ring-gray-300">
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
              className={`flex items-start gap-3 rounded-xl px-4 py-3 group transition-all duration-300 ease-in-out ${colors.bg} ${colors.text} ${rotation} hover:rotate-0 active:rotate-0 active:scale-[1.02] hover:scale-[1.02] hover:shadow-lg active:shadow-lg`}
            >
              <div className="mt-0.5 flex-shrink-0 group-hover:rotate-6 group-active:rotate-6 transition-all duration-300">
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
export default QuickTips;
