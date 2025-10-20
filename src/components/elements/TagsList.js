import { getColorForIndex } from '@/lib/colors';

/**
 * Shared Tags Component
 */
const TagsList = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => {
        const tagColors = getColorForIndex(index);
        return (
          <span
            key={index}
            className={`px-3 py-1 text-xs font-medium rounded-sm ${tagColors.bg} ${tagColors.text} tracking-wide`}
          >
            #{tag}
          </span>
        );
      })}
    </div>
  );
};

export default TagsList;
