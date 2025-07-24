import { instance as axios } from '@/src/shared/api/axios';

export interface CompanySummaryResProps {
  id: number;
  name: string;
  logoUrl: string;
  wishCount: number;
  keywords: {
    content: string;
  }[];
}

export interface CompanySummaryProps {
  id: number;
  name: string;
  ogImageUrl: string;
}

export const fetchCompanySummary = async (id: string): Promise<CompanySummaryProps> => {
  const response = await axios.get<{ data: CompanySummaryResProps }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}/summary`,
  );
  const res = response.data.data;

  const company: CompanySummaryProps = {
    id: res.id,
    name: res.name,
    ogImageUrl: res.logoUrl,
  };

  return company;
};
