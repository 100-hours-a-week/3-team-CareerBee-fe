import { Toggle } from '@/components/ui/toggle';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
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
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

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
        filtered = filtered.filter((c) => bookmarkedIds.includes(c.id));
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
  }, [activeFilters, companies, setCompanyDisabledMap, bookmarkedIds]);

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

                if (id === 'recruiting') {
                  const recruiting = companies.filter((c) => c.recruitingStatus === 'ongoing');
                  console.log('Recruiting companies:', recruiting);
                } else if (id === 'bookmark') {
                  const token = localStorage.getItem('accessToken');
                  if (!token) return;
                  axios.get(`${import.meta.env.VITE_API_URL}/api/v1/members/wish-companies/id-list`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }).then((res) => {
                    setBookmarkedIds(res.data.data.wishCompanies);
                  }).catch((err) => {
                    console.error('Failed to fetch bookmarked companies', err);
                  });
                } else {
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
