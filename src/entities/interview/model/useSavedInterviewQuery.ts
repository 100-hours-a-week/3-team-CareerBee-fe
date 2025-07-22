import { fetchSavedInterview } from '../api/fetchSavedInterview';

import { useInfiniteQuery } from '@tanstack/react-query';

export const useSavedInterviewQuery = () => {
  return useInfiniteQuery({
    queryKey: ['wishCompanies'],
    queryFn: fetchSavedInterview,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
  });
};
