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
type PageParams = Promise<{ id: string }>;
export default async function CompanyPage({ params }: { params: PageParams }) {
  const { id } = await params;
  try {
    const company = await fetchCompanyDetail(id);
    return <CompanyDetail company={company} />;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
