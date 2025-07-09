import { fetchCompanyDetail } from '@/src/entities/company/api/fetchCompanyDetail';

export async function handleCompanyDetail(
  id: string,
  setCompany: (data: any) => void,
  setIsBookmarked: (val: boolean) => void,
  bookmarkStatus: (id: number, cb: (val: boolean) => void) => void
) {
  const data = await fetchCompanyDetail(id);
  setCompany(data);
  bookmarkStatus(Number(id), setIsBookmarked);
}
