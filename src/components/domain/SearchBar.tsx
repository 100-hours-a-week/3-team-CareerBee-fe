import { Input } from '@/components/ui/input';
import { SuggestionList } from '@/components/domain/SuggestionList';
import { PiMagnifyingGlass, PiX } from 'react-icons/pi';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { CompanySuggestion } from '@/store/search';

export function SearchBar({
  suggestions = [],
  onSuggestionSelect,
  value,
  onChange,
  ...props
}: React.ComponentProps<typeof Input> & {
  suggestions?: CompanySuggestion[];
  onSuggestionSelect?: (value: CompanySuggestion) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full">
      <Button
        variant="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2"
        label={<PiMagnifyingGlass />}
        onClick={() => inputRef.current?.focus()}
      />
      <Input
        ref={inputRef}
        variant="search"
        className="pl-12 pr-10"
        value={value}
        onChange={(e) => {
          onChange?.(e);
          console.log('SearchBar에서 onChange 호출:', e.target.value);
        }}
        {...props}
      />
      {value && (
        <Button
          variant="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          label={<PiX />}
          onClick={() => {
            const syntheticEvent = {
              target: { value: '' },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange?.(syntheticEvent);
          }}
        />
      )}
      {value && suggestions.length > 0 && (
        <SuggestionList
          filteredSuggestions={suggestions}
          onSuggestionSelect={onSuggestionSelect}
          onClose={() => {
            const syntheticEvent = {
              target: { value: '' },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange?.(syntheticEvent);
          }}
        />
      )}
    </div>
  );
}
