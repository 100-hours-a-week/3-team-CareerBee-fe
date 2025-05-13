import { useEffect } from 'react';
import { instance as axios } from '@/lib/axios';
import { useSearchStore } from '@/store/search';

export function useFetchSuggestions() {
  const { search, setSuggestions } = useSearchStore();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length < 1) {
        setSuggestions([]);
        return;
      }
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/companies/search`, {
          params: { keyword: search },
        });
        console.log('🔍', data.data)
        const names = data.data.matchingCompanies.map(
          (company: { id: number; name: string; }) => ({
            id: company.id,
            name: company.name,
          })
        );
        setSuggestions(names.slice(0, 8));
      } catch (error) {
        console.error('회사 검색 실패:', error);
      }
    };

    fetchSuggestions();
  }, [search, setSuggestions]);
}
