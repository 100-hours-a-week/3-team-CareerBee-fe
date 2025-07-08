'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/widgets/ui/tabs';
import DefaultTab from '@/src/entities/company/ui/defaultTab';
import RecruitTab from '@/src/entities/company/ui/recruit';
import IssueTab from '@/src/entities/company/ui/issue';
import BenefitTab from '@/src/entities/company/ui/benefit';
import TechstackTab from '@/src/entities/company/ui/techstack';

import { useCompanyStore } from '@/src/entities/company/model/companyDetail';

export const CompanyTab = () => {
  const { company } = useCompanyStore();

  if (!company) return;
  return (
    <Tabs defaultValue="defaultTab" className="grow mt-4 w-full">
      <TabsList>
        <TabsTrigger value="defaultTab" variant={'company'}>
          기본
        </TabsTrigger>
        <TabsTrigger value="recruit" variant={'company'}>
          채용 정보
        </TabsTrigger>
        <TabsTrigger value="issue" variant={'company'}>
          최근 이슈
        </TabsTrigger>
        <TabsTrigger value="benefit" variant={'company'}>
          복지
        </TabsTrigger>
        {company.techStacks.length > 0 && (
          <TabsTrigger value="techStack" variant={'company'}>
            기술 스택
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="defaultTab" className="grow">
        <DefaultTab company={company} />
      </TabsContent>
      <TabsContent value="recruit">
        <RecruitTab recruitments={company.recruitments} />
      </TabsContent>
      <TabsContent value="issue">
        <IssueTab name={company.name} issue={company.recentIssue} />
      </TabsContent>
      <TabsContent value="benefit">
        <BenefitTab benefits={company.benefits} />
      </TabsContent>
      {company.techStacks.length > 0 && (
        <TabsContent value="techStack">
          <TechstackTab techstacks={company.techStacks} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default CompanyTab;
