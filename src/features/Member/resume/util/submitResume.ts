import { ResumeFormValues } from '../resumeForm';

import { toast } from '@/hooks/useToast';
import { safePatch } from '@/lib/request';
import { useResumeResultStore } from '@/features/Member/resume/store/resumeStore';

import { useNavigate } from 'react-router-dom';

export const submitResume = async (
  data: ResumeFormValues,
  token: string | null,
  navigate: ReturnType<typeof useNavigate>,
) => {
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

    if (res && typeof res === 'object' && 'status' in res && res.status === 204) {
      useResumeResultStore.getState().setResult(body);
      navigate('/resume/download');
    }
  } catch (error) {
    toast({ title: '저장 실패', variant: 'destructive' });
  }
};
