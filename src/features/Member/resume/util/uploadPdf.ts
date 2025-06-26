import { safePost } from '@/lib/request';
import { handlePresignedUrl } from '@/features/Member/profile/util/handlePresignedUrl';
import { useResumeStore } from '@/features/Member/resume/store/resumeStore';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const uploadPdf = async (
  e: React.FormEvent<HTMLFormElement>,
  token: string | null,
  navigate: ReturnType<typeof useNavigate>,
) => {
  if (!token) return;
  e.preventDefault();

  const input = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('#resume-upload');
  const file = input?.files?.[0] || null;
  if (file != null) {
    const objectKey = await handlePresignedUrl({
      file,
      token,
      type: 'resume',
      uploadType: 'RESUME',
    });

    try {
      const res = await safePost(
        '/api/v1/members/resume/complete-upload',
        {
          objectKey: objectKey,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 0,
        },
      );
      if (res.httpStatusCode === 200) {
        useResumeStore.getState().setResume(res.data);
        navigate('/resume/form');
      }
    } catch (err: any) {
      alert(err);
    }
  }
};
