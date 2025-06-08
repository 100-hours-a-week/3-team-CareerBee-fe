import CompanyCard from '@/features/Map/components/CompanyCard';

import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useCompanyStore } from '@/store/company';
import axios from 'axios';
import { safeGet } from '@/lib/request';

import { useEffect, useState } from 'react';
import { useRef, useCallback } from 'react';

export interface WishCompany {
  id: number;
  name: string;
  logoUrl: string;
  keywords: {
    content: string;
  }[];
  wishCount: number;
}
export interface WishCompanyListResponse {
  wishCompanies: WishCompany[];
  nextCursor: number;
  hasNext: boolean;
}

const getWishCompanyList = async (token: string | null, nextCursor?: number) => {
  let res;
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    res = await axios.get('/mock/mock-wish-company.json');
  } else {
    if (!token) return;
    res = await safeGet('/api/v1/members/wish-companies', {
      //TODO: nextCursor 추가
      // params: {
      //   nextCursor,
      // },
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  if (res.status === 200) {
    return res.data;
  }
};

export default function WishCompanyList() {
  const token = useAuthStore((state) => state.token);
  const { setIsBookmarked } = useCompanyStore();
  const [companies, setCompanies] = useState<WishCompany[]>([]);
  const [nextCursor, setNextCursor] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getWishCompanyList(token);
      if (data) {
        setCompanies(data.wishCompanies);
        setNextCursor(data.nextCursor);
        setHasNext(data.hasNext);
      }
    })();
  }, [token]);

  const fetchMoreCompanies = useCallback(async () => {
    const data = await getWishCompanyList(token, nextCursor);
    if (data) {
      setCompanies((prev) => [...prev, ...data.wishCompanies]);
      setNextCursor(data.nextCursor);
      setHasNext(data.hasNext);
    }
  }, [token, nextCursor]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNext) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreCompanies();
      }
    });

    if (bottomRef.current) {
      observerRef.current.observe(bottomRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasNext, nextCursor]);

  return (
    <div className="flex flex-col w-full items-center justify-center px-6 py-3 gap-2 border border-transparent border-b-border/30">
      <div className="text-base font-bold w-full items-start">관심 기업</div>
      <div className="flex items-start justify-start w-full overflow-x-auto gap-2 pb-1">
        {companies && companies.length > 0 ? (
          companies.map((company: WishCompany) => (
            <CompanyCard
              companyId={company.id}
              companyName={company.name}
              bookmarkCount={company.wishCount}
              tags={company.keywords.map((keyword) => keyword.content)}
              imageUrl={company.logoUrl}
              isCompanyCardList={true}
              isLoggedIn={!!token}
              setIsBookmarked={setIsBookmarked}
            />
          ))
        ) : (
          <div className="flex justify-center text-sm text-text-secondary py-2 w-full">
            지도에서 관심 기업을 추가해보세요!
          </div>
        )}
        <div ref={bottomRef} className="h-full w-[1px] border border-2px border-border" />
      </div>
    </div>
  );
}
