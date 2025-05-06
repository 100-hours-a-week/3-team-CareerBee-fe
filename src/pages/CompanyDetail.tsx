import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import CompanyTitle from '@/components/domain/CompanyTitle';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (!id) {
      console.log("no id")
      return;
    }

    const fetchCompanyDetail =  () => {
       axios
        // .get(`https://api.careerbee.co.kr/api/v1/companies/${id}`)
        .get('/mock/CompanyDetail.json')
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
    <>
      <CompanyTitle 
          logoUrl={company.logoUrl ?? noImg}
          name={company.name}
          wishCount={company.wishCount}
          isLoggedIn={isLoggedIn}
          isBookmarked={isBookmarked}
      />
    </>
  );
}