import { fetchCompanyDetail } from '@/src/entities/company/api/fetchCompanyDetail';

export async function handleCompanyDetail(
  id: string,
  setCompany: (data: any) => void,
  setIsBookmarked: (val: boolean) => void,
  bookmarkStatus: (id: number, cb: (val: boolean) => void) => void
) {
  try {
    const data = await fetchCompanyDetail(id);
    setCompany(data);
    bookmarkStatus(Number(id), setIsBookmarked);
  } catch (error) {
    console.error('기업 정보 불러오기 실패', error);
  }
}
