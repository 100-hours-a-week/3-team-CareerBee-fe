import { useEffect } from 'react';
import axios from 'axios';
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
        const { data } = await axios.get('https://api.careerbee.co.kr/api/v1/companies/search', {
          params: { keyword: search },
        });
        const names = data.data.matchingCompanies.map((company: { name: string }) => company.name);
        setSuggestions(names.slice(0, 8));
      } catch (error) {
        console.error('회사 검색 실패:', error);
      }
    };

    fetchSuggestions();
  }, [search, setSuggestions]);
}
