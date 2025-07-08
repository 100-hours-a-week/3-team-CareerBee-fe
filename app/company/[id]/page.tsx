import {
  fetchAllCompanies,
  fetchCompanyDetail,
} from '@/src/entities/company/api/fetchCompanyDetail';
import CompanyDetail from '@/src/entities/company/ui/CompanyDetail';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const companies = await fetchAllCompanies();
  return companies.map((company) => ({ id: String(company.id) }));
}
type PageParams = Promise<{ itemId: string }>;
export default async function CompanyPage({ params }: { params: PageParams }) {
  try {
    const company = await fetchCompanyDetail((await params).itemId);
    return <CompanyDetail company={company} />;
  } catch (error) {
    return notFound();
  }
}
