/* global kakao */

import { PiMagnifyingGlass, PiX } from 'react-icons/pi';
import { Button } from '@/src/widgets/ui/button';
import { Input } from '@/src/widgets/ui/input';
import { SuggestionList } from '@/src/features/map/ui/SuggestionList';

import { CompanySuggestion } from '@/src/features/map/model/search';
import { handleSuggestionSelect } from '@/src/features/map/api/handleSuggestionSelect';
import { useFetchSuggestions } from '@/src/entities/map/api/useFetchSuggestions';

import { cn } from '@/src/shared/lib/utils';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

export function SearchBar({
  suggestions = [],
  value,
  onChange,
  // setHighlightedCompanyId,
  mapRef,
  ...props
}: React.ComponentProps<typeof Input> & {
  suggestions?: CompanySuggestion[];
  // setHighlightedCompanyId: React.Dispatch<React.SetStateAction<number | null>>;
  mapRef: React.MutableRefObject<kakao.maps.Map | null>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showList, setShowList] = useState(value && suggestions.length > 0);
  const [selectedIndex, setSelectedIndex] = useState<number>(-2);

  const clearInput = () => {
    setSelectedIndex(-2);
    const syntheticEvent = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  };
  useEffect(() => {
    if (value === '') {
      setSelectedIndex(-2);
    }
  }, [value]);

  useFetchSuggestions();

  return (
    <div className="absolute w-full z-50 px-4 py-2">
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 border bg-white shadow rounded-3xl',
          showList ? 'max-h-[400px]' : 'max-h-[56px]',
        )}
      >
        <div className="relative">
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
            onChange={onChange}
            onKeyDown={(e) => {
              if (!suggestions.length) return;
              else {
                setShowList(true);
              }

              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % suggestions.length);
              }

              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
              }

              if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                handleSuggestionSelect(suggestions[selectedIndex], mapRef);
                setShowList(false);
                clearInput();
              }

              if (e.key === 'Escape') {
                clearInput();
              }
            }}
            {...props}
          />
          {value && (
            <Button
              variant="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              label={<PiX />}
              onClick={clearInput}
            />
          )}
        </div>

        {showList && (
          <SuggestionList
            filteredSuggestions={suggestions}
            mapRef={mapRef}
            onClose={clearInput}
            selectedIndex={selectedIndex}
          />
        )}
      </div>
    </div>
  );
}
