import { Company } from '@/src/entities/company/model/companyType';
import { instance as axios } from '@/src/shared/api/axios';

export async function fetchAllCompanies(): Promise<{ id: number }[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/ids`
    );
    return response.data.data;
  } catch (error) {
    console.error('전체 기업 목록 불러오기 실패', error);
    throw error;
  }
}

export async function fetchCompanyDetail(id: string): Promise<Company> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error('기업 정보 불러오기 실패', error);
    throw error;
  }
}