import { cn } from '@/lib/utils';

// 수정된 타입
export function SuggestionList({
  filteredSuggestions,
  onSuggestionSelect,
  onClose,
}: {
  filteredSuggestions: { id: number; name: string; }[];
  onSuggestionSelect?: (value: { id: number; name: string;}) => void;
  onClose?: () => void;
}) {
  return (
    <ul className="absolute z-50 mt-1 w-full rounded-[24px] border bg-white shadow max-h-96 overflow-auto">
      {filteredSuggestions.slice(0, 8).map((item, i, arr) => {
        const isFirst = i === 0;
        const isLast = i === arr.length - 1;
        return (
          <li
            key={i}
            className={cn(
              'cursor-pointer px-4 py-2 hover:bg-gray-100',
              isFirst && 'rounded-t-[24px]',
              isLast && 'rounded-b-[24px]',
            )}
            onClick={() => {
              onSuggestionSelect?.(item);
              onClose?.();
            }}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}