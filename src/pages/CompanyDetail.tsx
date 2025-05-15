import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { instance as axios } from '@/lib/axios';
import CompanyTitle from '@/components/domain/CompanyTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import noImg from '@/assets/no-image.png';
import { PiStar, PiStarFill,PiStarHalfFill } from "react-icons/pi";

import DefaultTab from '@/components/domain/company/defaultTab'
import RecruitTab from '@/components/domain/company/recruit' 
import IssueTab from '@/components/domain/company/issue'
import BenefitTab from "@/components/domain/company/benefit";
import TechstackTab from '@/components/domain/company/techstack'
import { handleToggleBookmark as toggleBookmarkUtil } from '@/lib/toggleBookmark';

import { useFetchBookmarkStatus } from "@/hooks/useFetchBookmarkStatus";
import { useAuthStore } from '@/store/auth';
import { Loader } from "@/components/ui/loader";

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

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company>();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const token = useAuthStore((state) => state.token);
  // const [lastRecruitMonth] = useState<number | null>(10);
  
  const { bookmarkStatus } = useFetchBookmarkStatus();
  useEffect(() => {
    if (!id) {
      console.log("no id")
      return;
    }
    const fetchCompanyDetail =  () => {
      axios
      // .get(`${import.meta.env.VITE_API_URL}/api/v1/companies/${id}`)
      .get('/mock/CompanyDetail.json') //🚨 목 데이터로 작업시에만 켜기!!!
      .then((response) => {
        const data = response.data;
        // setCompany(data.data);
        setCompany(data.data.company)  //🚨 목 데이터로 작업시에만 켜기!!!
        // console.log(data);
        console.count('😈기업 상세 렌더링 횟수');
        bookmarkStatus(Number(id), setIsBookmarked);
      })
      .catch((error) => {
        console.error("기업 정보 불러오기 실패", error);
      })
    }
    
    fetchCompanyDetail();

  }, [id, bookmarkStatus]);

  const handleToggleBookmark = async () => {
    if (!token) {
      console.error("login first");
      return;
    }
    if(!company)  return;
    return await toggleBookmarkUtil(token, company.id, isBookmarked, setIsBookmarked);
  };

  if (!company) return (
        <div className="flex flex-col gap-4 h-screen items-center justify-center text-lg font-semibold">
          <Loader/>
          <p>
            기업 정보를 불러오는 중이에요...
          </p>
        </div>
  );

  return (
    <div className="flex flex-col grow">
        {company.recruitments && company.recruitments.length > 0 ? (
      <div className="overflow-hidden h-6 bg-secondary text-text-primary text-sm flex items-center">
          <div className="flex animate-marquee whitespace-nowrap min-w-max">
            <span className="mx-16">현재 채용 중입니다.</span>
            <span className="mx-16">현재 채용 중입니다.</span>
            <span className="mx-16">현재 채용 중입니다.</span>
            <span className="mx-16">현재 채용 중입니다.</span>
          </div>
          </div>
        ) : (
          // <div className="flex min-w-max m-auto">
          //   <span className="">
          //     {company.name} 은/는 작년{" "}
          //     <span className="font-bold">
          //       {lastRecruitMonth ? `${lastRecruitMonth}월` : 'OO월'}
          //     </span>
          //     에 채용 시작했습니다.
          //   </span>
          // </div>
          <></>
        )}
        
      {/* 갤러리 */}
      <div className="grid grid-cols-4 grid-rows-2 gap-1 max-w-full mx-auto">
      {[...Array(5)].map((_, index) => {
          const photo = company.photos?.[index];
          const imageUrl = photo?.url ?? noImg;
          return (
            <img
              key={index}
              src={imageUrl}
              alt={company.name ?? "no image"}
              className={index === 0 ? "col-span-2 row-span-2 w-full h-full rounded-lg aspect-[4/3] object-cover" : "aspect-[4/3] object-cover rounded-lg"}
            />
          );
        })}
      </div>

      {/* 기업 제목 */}
      <div className="-mt-9 pl-2 relative z-10">
        <CompanyTitle 
            logoUrl={company.logoUrl ?? noImg}
            name={company.name}
            wishCount={company.wishCount}
            isLoggedIn={!!token}
            {...(token
              ? {
                  onToggleBookmark: handleToggleBookmark,
                  isBookmarked: isBookmarked,
                }
              : {
                  isBookmarked: false,
                })}
        />
      </div>

      {/* 기업 정보 */}
      <div className="flex flex-col px-4 gap-2 my-2">
        <div className="text-lg font-semibold">{company.title}</div>
        <div className="flex gap-0.5 [&_svg]:size-5 text-primary">
        {[...Array(5)].map((_, index) => {
          const full = Math.floor(company.rating);
          const decimal = company.rating - full;
          if (index < full) {
            return <PiStarFill key={index}/>;
          } else if (index === full) {
            if (decimal < 0.333) return <PiStar key={index} />;
            if (decimal < 0.666) return <PiStarHalfFill key={index} />;
            return <PiStarFill key={index} />;
          } else {
            return <PiStar key={index} />;
          }
        })}
        <p className="ml-2 text-sm text-text-secondary">캐치 종합 점수 기준</p>
        </div>
        <div className="w-full text-center font-semibold">
          {`평균: ${
            company.financials.annualSalary
              ? (company.financials.annualSalary / 10000).toLocaleString()
              : '-'
          }만원 / 신입: ${
            company.financials.startingSalary
              ? (company.financials.startingSalary / 10000).toLocaleString()
              : '-'
          }만원`}
        </div>
      </div>
      <Tabs defaultValue="defaultTab" className="grow mt-4 w-full">
       <TabsList>
          <TabsTrigger value="defaultTab" variant={"company"}>기본</TabsTrigger>
          <TabsTrigger value="recruit" variant={"company"}>채용 정보</TabsTrigger>
          <TabsTrigger value="issue" variant={"company"}>최근 이슈</TabsTrigger>
          <TabsTrigger value="benefit" variant={"company"}>복지</TabsTrigger>
          {company.techStacks.length > 0 && (<TabsTrigger value="techStack" variant={"company"}>기술 스택</TabsTrigger>)}
        </TabsList>
        <TabsContent value="defaultTab" className="grow"><DefaultTab company={company} /></TabsContent>
        <TabsContent value="recruit"><RecruitTab recruitments={company.recruitments} /></TabsContent>
        <TabsContent value="issue"><IssueTab name={company.name} issue={company.recentIssue}/></TabsContent>
        <TabsContent value="benefit"><BenefitTab benefits={company.benefits}/></TabsContent>
        {company.techStacks.length > 0 && (
          <TabsContent value="techStack"><TechstackTab techstacks={company.techStacks} /></TabsContent>
        )}</Tabs>
    </div>
  );
}