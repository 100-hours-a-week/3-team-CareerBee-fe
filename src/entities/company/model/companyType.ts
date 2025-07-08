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

export interface CompanyDetailResponse {
  company: Company;
}