import {
  fetchAllCompanies,
  fetchCompanyDetail,
} from '@/src/entities/company/api/fetchCompanyDetail';
import { fetchCompanySummary } from '@/src/entities/company/api/fetchCompanySummary';
import CompanyDetail from '@/src/entities/company/ui/CompanyDetail';
import { notFound } from 'next/navigation';
import { fetchIssue } from '@/src/entities/company/api/fetchIssue';

import { Metadata } from 'next';

type PageParams = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { id } = await params;
  const company = await fetchCompanySummary(id);

  return {
    title: `${company.name} - 채용 정보 | 커리어비`,
    description: `${company.name}의 최신 채용 정보, 위치, 기업 이슈를 확인해보세요.`,
    openGraph: {
      title: `${company.name} - 채용 정보 | 커리어비`,
      description: `${company.name}의 회사 정보와 채용 공고를 한눈에!`,
      url: `https://careerbee.co.kr/company/${id}`,
      type: 'website',
      siteName: '커리어비',
      images: [
        {
          url: company.ogImageUrl ?? 'https://careerbee.co.kr/default-og.png',
          width: 1200,
          height: 630,
          alt: `${company.name} og 이미지`,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const companies = await fetchAllCompanies();
  return companies.map((company) => ({ id: String(company.id) }));
}

export default async function CompanyPage({ params }: { params: PageParams }) {
  const { id } = await params;
  const issue = await fetchIssue({ companyId: Number(id) });

  try {
    const company = await fetchCompanyDetail(id);
    return <CompanyDetail company={company} issue={issue} />;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
