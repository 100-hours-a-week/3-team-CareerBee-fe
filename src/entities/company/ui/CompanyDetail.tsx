'use client';

import { LoaderWrapper } from '@/src/widgets/ui/loaderWrapper';
import RecruitmentBanner from '@/src/entities/company/ui/RecruitmentBanner';
import CompanyTitle from '@/src/entities/company/ui/CompanyTitle';
import CompanySummary from '@/src/entities/company/ui/CompanySummary';
import CompanyTab from '@/src/entities/company/ui/CompanyTab';
import CompanyGallery from '@/src/entities/company/ui/CompanyGallery';

import {
  Company,
  CompanyGalleryProps,
  CompanySummaryProps,
  CompanyTitleProps,
} from '@/src/entities/company/model/companyType';

import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useUiStore } from '@/src/shared/model/ui';

export default function CompanyDetail({ company }: { company: Company }) {
  const pathname = usePathname();
  const backPressedFromHeader = useUiStore((state) => state.backPressedFromHeader);
  const mapPressedFromNavbar = useUiStore((state) => state.mapPressedFromNavbar);
  const exit = backPressedFromHeader || mapPressedFromNavbar;

  const companyGallery: CompanyGalleryProps = {
    photos: company.photos,
    name: company.name,
  };

  const companySummary: CompanySummaryProps = {
    title: company.title,
    rating: company.rating,
    financials: company.financials,
  };

  const companyTitle: CompanyTitleProps = {
    logoUrl: company.logoUrl,
    name: company.name,
    wishCount: company.wishCount,
    id: company.id,
  };

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
              <RecruitmentBanner isRecruiting={company.recruitingStatus === 'ONGOING'} />
              <CompanyGallery company={companyGallery} />
              <CompanyTitle company={companyTitle} />
              <CompanySummary company={companySummary} />
              <CompanyTab company={company} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
