import { Toggle } from '@/components/ui/toggle';
import { useState, useMemo } from 'react';
import { CompanyProps } from '@/pages/Main';
import { useMarkerStore } from '@/store/marker';


const CATEGORY_FILTERS = ["PLATFORM", "SI", "COMMERCE", "GAME", "TELECOM", "SECURITY", "FINANCE"];

interface FilterProps {
  id: string;
  label: string;
}
interface Props {
  filters: FilterProps[];
  companies: CompanyProps[];
}
const FilterGroup = ({ filters, companies }: Props) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const setCompanyDisabledMap = useMarkerStore((state) => state.setCompanyDisabledMap);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => {
      if (CATEGORY_FILTERS.includes(id)) {
        const others = prev.filter((f) => !CATEGORY_FILTERS.includes(f));
        return prev.includes(id) ? others : [...others, id];
      }
      return prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
    });
  };

  const filteredCompanies = useMemo(() => {
    let filtered = companies;

    activeFilters.forEach((filterId) => {
      if (filterId === 'recruiting') {
        filtered = filtered.filter((c) => c.recruitingStatus === 'ongoing');
        
      } else if (filterId === 'bookmark') {
        // TODO: Fetch bookmarked companies via API and filter accordingly
        // Placeholder: no filtering applied here
      } else if (CATEGORY_FILTERS.includes(filterId)) {
        filtered = filtered.filter((c) => c.businessType === filterId);
      }
    });

    const disabledMap = companies.reduce((acc, company) => {
      acc[company.id] = !filtered.some((c) => c.id === company.id);
      return acc;
    }, {} as Record<number, boolean>);
    setCompanyDisabledMap(disabledMap);

    return filtered;
  }, [activeFilters, companies, setCompanyDisabledMap]);

  console.log('Active Filters:', activeFilters);
  console.log('Filtered Companies:', filteredCompanies);

  return (
    <div className="w-full px-4 py-2 overflow-x-auto">
      {/* <div className="overflow-x-auto"> */}
        <div className="flex items-center gap-2 w-max whitespace-nowrap">
          {filters.map(({ id, label }) => (
            <Toggle
              key={id}
              variant="pill"
              label={label}
              pressed={activeFilters.includes(id)}
              onPressedChange={() => {
                toggleFilter(id);

                // Example filter logic (for illustration)
                if (id === 'recruiting') {
                  const recruiting = companies.filter((c) => c.recruitingStatus === 'ongoing');
                  console.log('Recruiting companies:', recruiting);
                } else if (id === 'bookmark') {
                  // TODO: Fetch bookmarked companies via API and match IDs
                  console.log('Fetch bookmarked company IDs');
                } else {
                  // Category filter (businessType)
                  const filtered = companies.filter((c) => c.businessType === id);
                  console.log(`Filtered by category (${id}):`, filtered);
                }
              }}
              className="shadow-md px-4 py-1 min-w-[72px] text-sm rounded-full border border-border/50 bg-white text-gray-800 whitespace-nowrap"
            >
            </Toggle>
          ))}
        </div>
      {/* </div> */}
    </div>
  );
};

export { FilterGroup };
