import { cn } from '@/lib/utils';

// 수정된 타입
export function SuggestionList({
  filteredSuggestions,
  onSuggestionSelect,
  onClose,
  isClosing = false,
}: {
  filteredSuggestions: { id: number; name: string; }[];
  onSuggestionSelect?: (value: { id: number; name: string;}) => void;
  onClose?: () => void;
  isClosing?: boolean;
}) {
  return (
    <ul className="z-50 duration-300 w-full rounded-b-3xl max-h-96 overflow-auto">
      {filteredSuggestions.slice(0, 8).map((item, i, arr) => {
        const isLast = i === arr.length - 1;
        return (
          <li
            key={i}
            className={cn(
              'cursor-pointer px-4 py-2 hover:bg-gray-100',
              isLast && 'rounded-b-[24px]',
              'pl-12'
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