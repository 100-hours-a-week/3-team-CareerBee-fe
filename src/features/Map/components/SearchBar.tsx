/* global kakao */

import { Input } from '@/components/ui/input';
import { SuggestionList } from '@/features/Map/components/SuggestionList';
import { Button } from '@/components/ui/button';

import { PiMagnifyingGlass, PiX } from 'react-icons/pi';
import { CompanySuggestion } from '@/features/Map/store/search';
import { useMapStore } from '@/features/Map/store/map';
import { instance as axios } from '@/features/Member/auth/utils/axios';

import { useFetchSuggestions } from '@/features/Map/hooks/useFetchSuggestions';

import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

export function SearchBar({
  suggestions = [],
  value,
  onChange,
  setHighlightedCompanyId,
  mapRef,
  ...props
}: React.ComponentProps<typeof Input> & {
  suggestions?: CompanySuggestion[];
  setHighlightedCompanyId: React.Dispatch<React.SetStateAction<number | null>>;
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

  const { setCenter, setZoom } = useMapStore();
  const handleSuggestionSelect = async (suggestion: CompanySuggestion) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/companies/${suggestion.id}/locations`,
      );
      const { latitude, longitude } = res.data.data.locationInfo;

      setHighlightedCompanyId(suggestion.id);

      const map = mapRef.current;
      if (map) {
        const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
        map.setLevel(3);
        map.setCenter(newCenter);

        setCenter({
          lat: newCenter.getLat(),
          lng: newCenter.getLng(),
        });
        setZoom(3);
      }
    } catch (error) {
      console.error('❌ 기업 위치 정보 조회 실패', error);
    }
  };

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
                handleSuggestionSelect(suggestions[selectedIndex]);
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
            onSuggestionSelect={handleSuggestionSelect}
            onClose={clearInput}
            selectedIndex={selectedIndex}
          />
        )}
      </div>
    </div>
  );
}
