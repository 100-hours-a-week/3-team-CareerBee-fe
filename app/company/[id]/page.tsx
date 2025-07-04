'use client';

import noImg from '@/public/images/no-image.png';

import { Loader } from '@/src/widgets/ui/loader';
import RecruitmentBanner from '@/src/entities/company/ui/RecruitmentBanner';
import CompanyTitle from '@/src/entities/company/ui/CompanyTitle';
import CompanySummary from '@/src/entities/company/ui/CompanySummary';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/widgets/ui/tabs';
import DefaultTab from '@/src/entities/company/ui/defaultTab';
import RecruitTab from '@/src/entities/company/ui/recruit';
import IssueTab from '@/src/entities/company/ui/issue';
import BenefitTab from '@/src/entities/company/ui/benefit';
import TechstackTab from '@/src/entities/company/ui/techstack';

import { useFetchBookmarkStatus } from '@/src/shared/api/useFetchBookmarkStatus';
import { instance as axios } from '@/src/shared/api/axios';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useUiStore } from '@/src/shared/model/ui';

import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Company } from '@/src/entities/company/model/company';

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const pathname = usePathname();

  const [company, setCompany] = useState<Company>();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const token = useAuthStore((state) => state.token);

  const { bookmarkStatus } = useFetchBookmarkStatus();

  const backPressedFromHeader = useUiStore((state) => state.backPressedFromHeader);
  const mapPressedFromNavbar = useUiStore((state) => state.mapPressedFromNavbar);
  const exit = backPressedFromHeader || mapPressedFromNavbar;

  // 존재하지 않는 기업
  useEffect(() => {
    const fetchCompanyDetail = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}`)
        // .get('/mock/CompanyDetail.json') //🚨 목 데이터로 작업시에만 켜기!!!
        .then((response) => {
          const data = response.data;
          setCompany(data.data);
          // setCompany(data.data.company)  //🚨 목 데이터로 작업시에만 켜기!!!
          bookmarkStatus(Number(id), setIsBookmarked);
        })
        .catch((error) => {
          console.error('기업 정보 불러오기 실패', error);
        });
    };

    fetchCompanyDetail();
  }, [id, bookmarkStatus]);

  if (!company)
    return (
      <div className="flex flex-col gap-4 h-screen items-center justify-center text-lg font-semibold">
        <Loader />
        <p>기업 정보를 불러오는 중이에요...</p>
      </div>
    );

  return (
    <AnimatePresence>
      <div className="overflow-auto">
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
              <div className="-mt-9 pl-2 relative z-10">
                <CompanyTitle
                  logoUrl={company.logoUrl ?? noImg}
                  name={company.name}
                  wishCount={company.wishCount}
                  isLoggedIn={!!token}
                  companyId={company.id}
                  isBookmarked={token ? isBookmarked : false}
                  setIsBookmarked={setIsBookmarked}
                />
              </div>

              {/* 기업 정보 */}
              <CompanySummary
                title={company.title}
                rating={company.rating}
                annualSalary={company.financials.annualSalary}
                startingSalary={company.financials.startingSalary}
              />

              {/* 기업 탭 */}
              <Tabs defaultValue="defaultTab" className="grow mt-4 w-full">
                <TabsList>
                  <TabsTrigger value="defaultTab" variant={'company'}>
                    기본
                  </TabsTrigger>
                  <TabsTrigger value="recruit" variant={'company'}>
                    채용 정보
                  </TabsTrigger>
                  <TabsTrigger value="issue" variant={'company'}>
                    최근 이슈
                  </TabsTrigger>
                  <TabsTrigger value="benefit" variant={'company'}>
                    복지
                  </TabsTrigger>
                  {company.techStacks.length > 0 && (
                    <TabsTrigger value="techStack" variant={'company'}>
                      기술 스택
                    </TabsTrigger>
                  )}
                </TabsList>
                <TabsContent value="defaultTab" className="grow">
                  <DefaultTab company={company} />
                </TabsContent>
                <TabsContent value="recruit">
                  <RecruitTab recruitments={company.recruitments} />
                </TabsContent>
                <TabsContent value="issue">
                  <IssueTab name={company.name} issue={company.recentIssue} />
                </TabsContent>
                <TabsContent value="benefit">
                  <BenefitTab benefits={company.benefits} />
                </TabsContent>
                {company.techStacks.length > 0 && (
                  <TabsContent value="techStack">
                    <TechstackTab techstacks={company.techStacks} />
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
