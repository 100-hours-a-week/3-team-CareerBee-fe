import { Toggle } from '@/components/ui/toggle';
import { instance as axios } from '@/features/Member/auth/utils/axios';
import { useState, useEffect } from 'react';
import { CompanyProps } from '@/features/Map/Main';
import { useMarkerStore } from '@/features/Map/store/marker';
import { useAuthStore } from '@/features/Member/auth/store/auth';

const CATEGORY_FILTERS = ['PLATFORM', 'SI', 'COMMERCE', 'GAME', 'TELECOM', 'SECURITY', 'FINANCE'];

interface FilterProps {
  id: string;
  label: string;
}
interface Props {
  filters: FilterProps[];
  companies: CompanyProps[];
}
const fetchBookmarkedIds = async (setBookmarkedIds: (_ids: number[]) => void) => {
  const token = useAuthStore.getState().token;
  if (!token) return;

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/members/wish-companies/id-list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setBookmarkedIds(res.data.data.wishCompanies);
  } catch (err) {
    console.error('Failed to fetch bookmarked companies', err);
  }
};

const FilterGroup = ({ filters, companies }: Props) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const setCompanyDisabledMap = useMarkerStore((state) => state.setCompanyDisabledMap);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [filterTrigger, setFilterTrigger] = useState(0);

  const handleFilterChange = async (id: string) => {
    const isCategoryFilter = (id: string) => CATEGORY_FILTERS.includes(id);
    if (isCategoryFilter(id)) {
      setActiveFilters((prev) => {
        const nonCategory = prev.filter((f) => !isCategoryFilter(f));
        return prev.includes(id) ? nonCategory : [...nonCategory, id]; //이전 액티브 필터 목록 중 카테고리 필터 제외
      });
    } else if (id === 'bookmark') {
      await fetchBookmarkedIds(setBookmarkedIds);
      setActiveFilters((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
      );
    } else if (id === 'recruiting') {
      setActiveFilters((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
      );
    }
  };

  useEffect(() => {
    if (companies.length === 0) return;

    const filtered = companies.filter((company) => {
      return activeFilters.every((filterId) => {
        if (filterId === 'recruiting') {
          return company.recruitingStatus === 'ongoing';
        } else if (filterId === 'bookmark') {
          return bookmarkedIds.includes(company.id);
        } else if (CATEGORY_FILTERS.includes(filterId)) {
          return company.businessType === filterId;
        }
        return true;
      });
    });

    const disabledMap = companies.reduce(
      (acc, company) => {
        acc[company.id] = !filtered.some((c) => c.id === company.id);
        return acc;
      },
      {} as Record<number, boolean>,
    );

    setCompanyDisabledMap(disabledMap);
  }, [activeFilters, companies, bookmarkedIds, filterTrigger]);

  // useMemo(() =>{
  //   let filtered = companies;
  // // const filtered = useMemo(() => {
  // //   let result = companies;

  //   activeFilters.forEach((filterId) => {
  //     if (filterId === 'recruiting') {
  //       filtered=filtered.filter((c)=>c.recruitingStatus === 'ongoing');
  //       // result = result.filter((c) => c.recruitingStatus === 'ongoing');
  //     } else if (filterId === 'bookmark') {
  //       filtered = filtered.filter((c) => bookmarkedIds.includes(c.id));
  //       // result = result.filter((c) => bookmarkedIds.includes(c.id));
  //     } else if (CATEGORY_FILTERS.includes(filterId)) {
  //       filtered = filtered.filter((c) => c.businessType === filterId);
  //       // result = result.filter((c) => c.businessType === filterId);
  //     }
  //   });

  // //   return result;
  // // }, [activeFilters, companies, bookmarkedIds]);

  // // useEffect(() => {
  //   const disabledMap = companies.reduce((acc, company) => {
  //     acc[company.id] = !filtered.some((c) => c.id === company.id);
  //     return acc;
  //   }, {} as Record<number, boolean>);

  //   setCompanyDisabledMap(disabledMap);
  //   return filtered;
  // }, [activeFilters, companies, setCompanyDisabledMap, bookmarkedIds]);
  // // }, [filtered, companies, setCompanyDisabledMap]);

  return (
    <div className="w-full px-4 py-2 overflow-x-auto scrollbar-hide group-hover:scrollbar-default">
      {/* <div className="overflow-x-auto"> */}
      <div className="flex items-center gap-2 w-max whitespace-nowrap">
        {filters.map(({ id, label }) => (
          <Toggle
            key={id}
            variant="pill"
            label={label}
            pressed={activeFilters.includes(id)}
            onPressedChange={() => {
              handleFilterChange(id);

              if (id === 'recruiting') {
                const recruiting = companies.filter((c) => c.recruitingStatus === 'ongoing');
                console.log('Recruiting companies:', recruiting);
              } else if (id === 'bookmark') {
                fetchBookmarkedIds(setBookmarkedIds, () => {
                  setFilterTrigger((v) => v + 1);
                });
              } else {
                const filtered = companies.filter((c) => c.businessType === id);
                console.log(`Filtered by category (${id}):`, filtered);
              }
            }}
            className="shadow-md px-4 py-1 min-w-[72px] text-sm rounded-full border border-border/50 bg-white text-gray-800 whitespace-nowrap"
          ></Toggle>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export { FilterGroup };
