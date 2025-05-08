import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import CompanyTitle from '@/components/domain/CompanyTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import noImg from '@/assets/no-image.png';

export interface CompanyDetailResponse {
  company: Company;
}

export interface Company {
  id: number;
  name: string;
  title: string;
  logoUrl: string;
  recentIssue: string;
  companyType: 'ENTERPRISE' | 'MID_SIZED' | 'SME';
  recruitingStatus: string;
  address: string;
  employeeCount: number;
  homepageUrl: string;
  description: string;
  wishCount: number;
  rating: number;
  financials: Financials;
  photos: CompanyPhoto[];
  benefits: CompanyBenefit[];
  techStacks: TechStack[];
  recruitments: Recruitment[];
}

export interface Financials {
  annualSalary: number;
  startingSalary: number;
  revenue: number;
  operatingProfit: number;
}

export interface CompanyPhoto {
  order: number;
  url: string;
}

export interface CompanyBenefit {
  type: 'COMPENSATION' | 'LEAVE' | 'TRANSPORT_MEALS' | 'WELLNESS' | 'EDUCATION_EVENTS' | 'ETC';
  description: string;
}

export interface TechStack {
  id: number;
  name: string;
  type: 'BACKEND' | 'FRONTEND' | 'AI' | 'DEVOPS' | 'COMMUNICATION';
  imgUrl: string;
}

export interface Recruitment {
  id: number;
  url: string;
  title: string;
  startDate: string;
  endDate: string;
}

const isBookmarked = true;

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoggedIn] = useState(false);


  useEffect(() => {
    if (!id) {
      console.log("no id")
      return;
    }

    const fetchCompanyDetail =  () => {
       axios
        .get(`${import.meta.env.VITE_API_URL}/api/v1/companies/${id}`)
        // .get('/mock/CompanyDetail.json')
        .then((response) => {
          const data = response.data;
          setCompany(data.data.company);
        })
        .catch((error) => {
          console.error("기업 정보 불러오기 실패", error);
        })
      }

    fetchCompanyDetail();
  }, [id]);

  if (!company) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col items-start">
      {/* 갤러리 */}
      <div className="grid grid-cols-4 grid-rows-2 gap-1 max-w-full mx-auto">
      {[...Array(5)].map((_, index) => {
          const photo = company.photos[index];
          const imageUrl = photo?.url ?? noImg;
          return (
            <img
              key={index}
              src={imageUrl}
              alt={company.name ?? "no image"}
              className={index === 0 ? "col-span-2 row-span-2 aspect-[4/3] object-cover rounded-lg" : "aspect-[4/3] object-cover rounded-lg"}
            />
          );
        })}
      </div>
      <CompanyTitle 
          logoUrl={company.logoUrl ?? noImg}
          name={company.name}
          wishCount={company.wishCount}
          isLoggedIn={isLoggedIn}
          isBookmarked={isBookmarked}
      />

      <Tabs defaultValue="main" className="mt-4 w-full">
       <TabsList>
          <TabsTrigger value="main" variant={"company"}>기본</TabsTrigger>
          <TabsTrigger value="recruit" variant={"company"}>채용 정보</TabsTrigger>
          <TabsTrigger value="issue" variant={"company"}>최근 이슈</TabsTrigger>
          <TabsTrigger value="benefit" variant={"company"}>복지</TabsTrigger>
          <TabsTrigger value="techStack" variant={"company"}>기술 스택</TabsTrigger>
        </TabsList>
        <TabsContent value="main">Make changes to your account here.</TabsContent>
        <TabsContent value="recruit">Change your password here.</TabsContent>
        <TabsContent value="issue">Change your password here.</TabsContent>
        <TabsContent value="benefit">Change your password here.</TabsContent>
        <TabsContent value="techStack">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}