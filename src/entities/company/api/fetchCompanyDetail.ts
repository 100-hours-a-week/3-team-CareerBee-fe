import { Company } from '@/src/entities/company/model/companyType';
import { instance as axios } from '@/src/shared/api/axios';

type CompanyIdResponse = { data: { id: number }[] };
type CompanyDetailResponse = { data: Company };

export async function fetchAllCompanies(): Promise<{ id: number }[]> {
  const response = await axios.get<CompanyIdResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/ids`,
  );
  return response.data.data;
}

export async function fetchCompanyDetail(id: string): Promise<Company> {
  const response = await axios.get<CompanyDetailResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}`,
  );
  return response.data.data;
}
