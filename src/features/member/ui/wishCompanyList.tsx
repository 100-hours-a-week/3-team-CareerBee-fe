import endOfList from '@/src/features/member/assets/end-of-list.png';
import CompanyCard from '@/src/entities/map/ui/CompanyCard';
import { CircleLoader } from '@/src/widgets/ui/loader';

import { useAuthStore } from '@/src/entities/auth/model/auth';
// import { useCompanyStore } from '@/store/company';
import axios from 'axios';
import { safeGet } from '@/src/shared/api/request';

import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';

export interface WishCompany {
  id: number;
  name: string;
  logoUrl: string;
  keywords: {
    content: string;
  }[];
  wishCount: number;
}

const getWishCompanyList = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const token = useAuthStore.getState().token;
  if (process.env.NEXT_USE_MOCK === 'true') {
    let tmp = await axios.get('/mock/mock-wish-company.json');
    const res = tmp.data;
    if (res.httpStatusCode === 200) {
      return res;
    }
  } else {
    if (!token) return;

    const res = await safeGet('/api/v1/members/wish-companies', {
      ...(pageParam !== 0 ? { params: { cursor: pageParam } } : {}),
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.httpStatusCode === 200) {
      return res.data;
    }
  }
};

export default function WishCompanyList() {
  // const { isBookmarked, setIsBookmarked } = useCompanyStore();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // const [isBookmarked, setIsBookmarked] = useState(true);
  const [bookmarkStates, setBookmarkStates] = useState<Record<number, boolean>>({});

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['wishCompanies'],
    queryFn: getWishCompanyList,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
  });

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [bottomRef, hasNextPage]);

  return (
    <div className="flex flex-col w-full items-center justify-center px-6 py-3 gap-2 border border-transparent border-b-border/30">
      <div className="text-base font-bold w-full items-start">관심 기업</div>
      <div className="flex items-start justify-start w-full overflow-x-auto gap-2 pb-1">
        {data?.pages?.length ? (
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group?.wishCompanies?.map((company: WishCompany) => (
                <CompanyCard
                  key={company.id}
                  companyId={company.id}
                  companyName={company.name}
                  bookmarkCount={company.wishCount}
                  tags={company.keywords.map((k) => k.content)}
                  imageUrl={company.logoUrl}
                  isCompanyCardList={true}
                  isLoggedIn={!!useAuthStore.getState().token}
                  isBookmarked={bookmarkStates[company.id] ?? true}
                  setIsBookmarked={(newVal: boolean) =>
                    setBookmarkStates((prev) => ({ ...prev, [company.id]: newVal }))
                  }
                />
              ))}
            </React.Fragment>
          ))
        ) : (
          <div className="flex justify-center text-sm text-text-secondary py-2 w-full">
            지도에서 관심 기업을 추가해보세요!
          </div>
        )}
        {isFetchingNextPage ? (
          <div className="flex items-center justify-center w-24 p-8 h-full">
            <CircleLoader />
          </div>
        ) : hasNextPage ? (
          <div ref={bottomRef} className="flex-none w-20 h-20" />
        ) : data?.pages?.length ? (
          <div className="flex-none w-24 h-full flex flex-col items-center justify-center text-text-secondary">
            <img src={endOfList.src} alt="끝" className="w-10 h-10 mb-2" />
            <span className="text-xs text-center">끝까지 봤어요!</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
