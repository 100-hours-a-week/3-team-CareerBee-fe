'use client';

import noImg from '@/public/images/no-image.png';

import { LoaderWrapper } from '@/src/widgets/ui/loaderWrapper';
import RecruitmentBanner from '@/src/entities/company/ui/RecruitmentBanner';
import CompanyTitle from '@/src/entities/company/ui/CompanyTitle';
import CompanySummary from '@/src/entities/company/ui/CompanySummary';
import CompanyTab from '@/src/entities/company/ui/CompanyTab';

import { fetchCompanyDetail } from '@/src/entities/company/api/fetchCompanyDetail';
// import { useFetchBookmarkStatus } from '@/src/shared/api/useFetchBookmarkStatus';

import { useCompanyStore } from '@/src/entities/company/model/companyDetail';
import { useUiStore } from '@/src/shared/model/ui';

import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();

  const { company } = useCompanyStore();

  // const [company] = useState<Company>();

  // const { bookmarkStatus } = useFetchBookmarkStatus();

  const backPressedFromHeader = useUiStore((state) => state.backPressedFromHeader);
  const mapPressedFromNavbar = useUiStore((state) => state.mapPressedFromNavbar);
  const exit = backPressedFromHeader || mapPressedFromNavbar;

  useEffect(() => {
    fetchCompanyDetail(id);
  }, [id]);

  if (!company)
    return (
      <div className="flex flex-col gap-4 h-screen items-center justify-center text-lg font-semibold">
        <LoaderWrapper />
        <p>기업 정보를 불러오는 중이에요...</p>
      </div>
    );

  return (
    <div className="overflow-auto">
      <AnimatePresence mode="wait">
        {!exit && (
          <motion.div
            key={pathname}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100vh', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="flex flex-col grow">
              <RecruitmentBanner isRecruiting={company.recruitments.length > 0} />

              {/* 갤러리 */}
              <div className="relative grid grid-cols-4 grid-rows-2 gap-1 max-w-full h-56 mx-auto">
                {[...Array(5)].map((_, index) => {
                  const photo = company.photos?.[index];
                  const imageUrl = photo?.url ?? noImg;
                  return (
                    <div
                      key={index}
                      className={
                        index === 0
                          ? 'col-span-2 row-span-2 relative aspect-[4/3]'
                          : 'relative aspect-[4/3]'
                      }
                    >
                      <Image
                        src={imageUrl}
                        alt={company.name ?? 'no image'}
                        fill
                        className="rounded-lg object-cover"
                        sizes={
                          index === 0
                            ? '(max-width: 600px) 100vw, 400px'
                            : '(max-width: 600px) 50vw, 200px'
                        }
                      />
                    </div>
                  );
                })}
              </div>

              {/* 기업 제목 */}
              <CompanyTitle />

              {/* 기업 정보 */}
              <CompanySummary />

              <CompanyTab />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
