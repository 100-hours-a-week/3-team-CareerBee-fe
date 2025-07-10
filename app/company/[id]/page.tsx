import {
  fetchAllCompanies,
  fetchCompanyDetail,
} from '@/src/entities/company/api/fetchCompanyDetail';
import CompanyDetail from '@/src/entities/company/ui/CompanyDetail';
import { notFound } from 'next/navigation';
import { fetchIssue } from '@/src/entities/company/api/fetchIssue';

export async function generateStaticParams() {
  const companies = await fetchAllCompanies();
  return companies.map((company) => ({ id: String(company.id) }));
}
type PageParams = Promise<{ id: string }>;
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
