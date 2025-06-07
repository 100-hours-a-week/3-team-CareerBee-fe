import CompanyCard from '@/features/Map/components/CompanyCard';

import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useCompanyStore } from '@/store/company';

export default function WishCompanyList() {
  const token = useAuthStore((state) => state.token);

  const { setIsBookmarked } = useCompanyStore();
  const companies = [...Array(0)];

  return (
    <div className="flex flex-col w-full items-center justify-center px-6 py-3 gap-2 border border-transparent border-b-border/30">
      <div className="text-base font-bold w-full items-start">관심 기업</div>
      <div className="flex items-start justify-start w-full overflow-x-auto gap-2 pb-1">
        {companies && companies.length > 0 ? (
          companies.map(() => (
            <CompanyCard
              companyId={1}
              companyName="샘플 기업"
              bookmarkCount={10}
              tags={['IT', '개발', '스타트업']}
              imageUrl="https://via.placeholder.com/150"
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
      </div>
    </div>
  );
}
