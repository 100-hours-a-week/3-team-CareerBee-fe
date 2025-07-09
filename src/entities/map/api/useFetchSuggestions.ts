import { useEffect } from 'react';
import { instance as axios } from '@/src/shared/api/axios';
import { useSearchStore } from '@/src/features/map/model/search';
import { useDebounce } from '@/src/shared/lib/useDebounce';

export function useFetchSuggestions() {
  const { search, setSuggestions } = useSearchStore();
  const debouncedSearch = useDebounce(search, 100);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch.length < 1) {
        setSuggestions([]);
        return;
      }
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/search`,
          {
            params: { keyword: debouncedSearch },
          },
        );
        const names = data.data.matchingCompanies.map((company: { id: number; name: string }) => ({
          id: company.id,
          name: company.name,
        }));
        setSuggestions(names.slice(0, 8));
      } catch (error) {
        console.error('회사 검색 실패:', error);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch, setSuggestions]);
}
