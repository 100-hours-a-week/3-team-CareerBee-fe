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

export default async function CompanyPage(props: { params: { id: string } }) {
  const { params } = await props;

  let company;
  try {
    company = await fetchCompanyDetail(params.id);
  } catch (error) {
    return notFound();
  }

  return <CompanyDetail company={company} />;
}
