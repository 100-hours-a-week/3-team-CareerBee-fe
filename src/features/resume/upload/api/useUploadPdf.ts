import { safePost } from '@/src/shared/api/request';
import { handlePresignedUrl } from '@/src/shared/api/handlePresignedUrl';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useUploadStore } from '@/src/features/resume/upload/model/uploadStore';

import React from 'react';

export const useUploadPdf = () => {
  const token = useAuthStore.getState().token;

  const { setIsLoading } = useUploadStore();
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
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
      if (res.httpStatusCode === 202) {
        setIsLoading(true);
      }
    }
  };

  return { handleUpload };
};
