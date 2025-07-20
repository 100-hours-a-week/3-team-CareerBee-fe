'use client';

import { useAuthStore } from '@/src/entities/auth/model/auth';
import { safePost } from '@/src/shared/api/request';

import { useState, useEffect } from 'react';

export const useDownload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const { token } = useAuthStore.getState();
  const requestResume = async () => {
    setIsLoading(true);
    try {
      const res = await safePost(
        '/api/v1/members/resume',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const rawUrl = res.data?.resumeUrl;

      if (rawUrl) {
        const matches = rawUrl.match(/file_url=([^,]+), file_name=([^}]+)/);

        if (matches && matches.length === 3) {
          const fileUrl = matches[1];
          const fileName = matches[2];

          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setIsLoading(false);
          setIsSuccess(true);
        } else {
          console.error('resumeUrl 파싱 실패:', rawUrl);
          setIsLoading(false);
          setIsFailed(true);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsFailed(true);
    }
  };

  return { isLoading, isSuccess, setIsSuccess, isFailed, setIsFailed, requestResume };
};
