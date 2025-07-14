import { ResumeFormProps } from '@/src/features/resume/form/model/resumeFormProps';

import { toast } from '@/src/shared/model/useToast';
import { safePatch } from '@/src/shared/api/request';
import { useResumeResultStore } from '@/src/features/resume/form/model/resumeStore';
import { useAuthStore } from '@/src/entities/auth/model/auth';

import { useRouter } from 'next/navigation';

export const useSubmitResume = () => {
  const token = useAuthStore.getState().token;
  const router = useRouter();

  const handleSubmit = async (data: ResumeFormProps) => {
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
        router.push('/resume/download');
      }
    } catch (error) {
      toast({ title: '저장 실패', variant: 'destructive' });
    }
  };

  return { handleSubmit };
};
