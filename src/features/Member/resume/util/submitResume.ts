import { ResumeFormValues } from '../resumeForm';

import { toast } from '@/hooks/useToast';
import { safePatch } from '@/lib/request';

export const submitResume = async (data: ResumeFormValues, token: string | null) => {
  if (!token) return;

  const body = {
    preferredJob: data.position,
    psTier: data.tier,
    certificationCount: data.certification_count,
    projectCount: data.project_count,
    majorType: data.major_type,
    workPeriod: data.work_period,
    position: data.role,
    additionalExperiences: data.additional_experiences,
  };

  try {
    const res = await safePatch('/api/v1/members/resume', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.httpStatusCode === 204) {
      window.location.href = '/resume/download';
    }
  } catch (error) {
    toast({ title: '저장 실패', variant: 'destructive' });
  }
};
