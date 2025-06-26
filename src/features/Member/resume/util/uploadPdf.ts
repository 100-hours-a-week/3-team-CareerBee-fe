import { safePost } from '@/lib/request';
import { handlePresignedUrl } from '@/features/Member/profile/util/handlePresignedUrl';
import { useResumeStore } from '@/features/Member/resume/store/resumeStore';

import React from 'react';

export const uploadPdf = async (e: React.FormEvent<HTMLFormElement>, token: string | null) => {
  if (!token) return;
  e.preventDefault();

  const input = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('#resume-upload');
  const file = input?.files?.[0] || null;
  if (file != null) {
    const objectUrl = await handlePresignedUrl({
      file,
      token,
      type: 'resume',
      uploadType: 'RESUME',
    });

    try {
      const res = await safePost(
        '/api/v1/members/resume/complete-upload',
        {
          objectUrl: objectUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.httpStatusCode === 200) {
        useResumeStore.getState().setResume(res.data);
      }
    } catch (err: any) {
      alert(err);
    }
  }
};
