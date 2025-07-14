'use client';

import { useAuthStore } from '@/src/entities/auth/model/auth';
import { safePost } from '@/src/shared/api/request';

import { useState, useEffect } from 'react';

export const handleDownload = () => {
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

      const resumeUrl = res.data?.resumeUrl;

      if (resumeUrl) {
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsFailed(true);
    }
  };

  return { isLoading, isSuccess, setIsSuccess, isFailed, setIsFailed, requestResume };
};
