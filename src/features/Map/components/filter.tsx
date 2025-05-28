import { Toggle } from '@/components/ui/toggle';
import { instance as axios } from '@/features/Member/auth/utils/axios';
import { useState, useEffect, useRef } from 'react';
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
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const setCompanyDisabledMap = useMarkerStore((state) => state.setCompanyDisabledMap);

  //현재 적용되는 필터들 리턴함
  const handleFilterChange = async (id: string) => {
    const isCategoryFilter = (id: string) => CATEGORY_FILTERS.includes(id);

    if (isCategoryFilter(id)) {
      setActiveFilters((prev) => {
        const nonCategory = prev.filter((f) => !isCategoryFilter(f));
        return prev.includes(id) ? nonCategory : [...nonCategory, id];
      });
      return;
    }

    if (id === 'bookmark') {
      await fetchBookmarkedIds(setBookmarkedIds);
    }

    if (id === 'bookmark' || id === 'recruiting') {
      setActiveFilters((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
      );
    }
  };

  const companiesRef = useRef(companies);
  const bookmarkedIdsRef = useRef(bookmarkedIds);

  // useEffect보다 먼저 최신값 동기화
  useEffect(() => {
    companiesRef.current = companies;
  }, [companies]);

  useEffect(() => {
    bookmarkedIdsRef.current = bookmarkedIds;
  }, [bookmarkedIds]);

  useEffect(() => {
    const filteredCompanies = companiesRef.current.filter((company) => {
      return activeFilters.every((filterId) => {
        if (CATEGORY_FILTERS.includes(filterId)) return company.businessType === filterId;
        if (filterId === 'bookmark') return bookmarkedIdsRef.current.includes(company.id);
        if (filterId === 'recruiting') return company.recruitingStatus === 'ONGOING';
        return true;
      });
    });

    const disabledMap = companiesRef.current.reduce(
      (acc, company) => {
        acc[company.id] = !filteredCompanies.some((c) => c.id === company.id);
        return acc;
      },
      {} as Record<number, boolean>,
    );

    setCompanyDisabledMap(disabledMap);
  }, [activeFilters, setCompanyDisabledMap]);

  return (
    <div className="w-full px-4 py-2 overflow-x-auto scrollbar-hide group-hover:scrollbar-default">
      <div className="flex items-center gap-2 w-max whitespace-nowrap">
        {filters.map(({ id, label }) => (
          <Toggle
            key={id}
            variant="pill"
            label={label}
            pressed={activeFilters.includes(id)}
            onPressedChange={() => {
              handleFilterChange(id);
            }}
            className="shadow-md px-4 py-1 min-w-[72px] text-sm rounded-full border border-border/50 bg-white text-gray-800 whitespace-nowrap"
          ></Toggle>
        ))}
      </div>
    </div>
  );
};

export { FilterGroup };
