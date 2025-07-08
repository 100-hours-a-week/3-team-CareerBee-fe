import { Company } from '@/src/entities/company/model/companyType';
import { instance as axios } from '@/src/shared/api/axios';

export async function fetchCompanyDetail(id: string): Promise<Company> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}`
  );
  return response.data.data;
}
