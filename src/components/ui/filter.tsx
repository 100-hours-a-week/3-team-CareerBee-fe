import { Toggle } from '@/components/ui/toggle';
import { useState } from 'react';

interface FilterProps {
  id: string;
  label: string;
}
interface Props {
  filters: FilterProps[];
}
const FilterGroup = ({ filters }: Props) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  console.log('Active Filters:', activeFilters);
  return (
    <div className="w-full px-4 py-2">
      <div className="overflow-x-auto">
        <div className="flex items-center gap-2 w-max whitespace-nowrap">
          {filters.map(({ id, label }) => (
            <Toggle
              key={id}
              variant="pill"
              pressed={activeFilters.includes(id)}
              onPressedChange={() => toggleFilter(id)}
            >
              {label}
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
};

export { FilterGroup };
