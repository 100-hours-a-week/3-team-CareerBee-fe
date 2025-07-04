import { cn } from '@/src/shared/lib/utils';
import { useSuggestionSelect } from '@/src/features/map/api/useSuggestionSelect';

export function SuggestionList({
  filteredSuggestions,
  mapRef,
  // onSuggestionSelect,
  onClose,
  selectedIndex,
  // isClosing = false,
}: {
  filteredSuggestions: { id: number; name: string }[];
  // onSuggestionSelect?: (_value: { id: number; name: string }) => void;
  mapRef: React.MutableRefObject<kakao.maps.Map | null>;
  onClose?: () => void;
  isClosing?: boolean;
  selectedIndex: number;
}) {
  const { handleSuggestionSelect } = useSuggestionSelect();

  return (
    <ul className="z-50 duration-300 w-full rounded-b-3xl max-h-96 overflow-auto">
      {filteredSuggestions.slice(0, 8).map((item, i, arr) => {
        const isLast = i === arr.length - 1;
        const isSelected = i === selectedIndex;
        return (
          <li
            key={i}
            className={cn(
              'cursor-pointer px-4 py-2 hover:bg-gray-100 pl-12',
              isSelected && 'bg-gray-100',
              isLast && 'rounded-b-[24px]',
            )}
            onClick={() => {
              handleSuggestionSelect(item, mapRef);
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
