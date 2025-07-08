import { useCompanyStore } from '@/src/entities/company/model/companyDetail';
import { useFetchBookmarkStatus } from '@/src/shared/api/useFetchBookmarkStatus';

import { instance as axios } from '@/src/shared/api/axios';

export function fetchCompanyDetail(id: string) {
  const { setCompany, setIsBookmarked } = useCompanyStore();
  const { bookmarkStatus } = useFetchBookmarkStatus();
  
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}`)
    // .get('/mock/CompanyDetail.json') //🚨 목 데이터로 작업시에만 켜기!!!
    .then((response) => {
      const data = response.data;
      setCompany(data.data);
      // setCompany(data.data.company)  //🚨 목 데이터로 작업시에만 켜기!!!
      bookmarkStatus(Number(id), setIsBookmarked);
    })
    .catch((error) => {
      console.error('기업 정보 불러오기 실패', error);
    });
}
