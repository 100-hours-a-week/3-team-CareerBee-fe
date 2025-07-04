'use client';

import { Button } from '@/src/widgets/ui/button';

import Profile from '@/src/features/member/ui/Profile';
import WishCompanyList from '@/src/features/member/ui/wishCompanyList';
import LogoutButton from '@/src/features/member/ui/LogoutButton';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 뒤로가기
  useEffect(() => {
    window.onpageshow = function (event) {
      if (
        event.persisted ||
        (window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)
          .type === 'back_forward'
      ) {
        queryClient.refetchQueries({ queryKey: ['userInfo'] });
      }
    };
  }, [queryClient]);

  return (
    <>
      <div className="flex flex-col grow">
        <div className="flex items-center h-fit px-6 py-4 gap-4 border border-transparent border-b-border/30">
          <Profile />
          <Button
            label="내 이력 조회"
            variant="primary"
            className="text-sm rounded-xl px-6"
            onClick={() => {
              router.push('/resume/upload');
            }}
          />
        </div>
        <WishCompanyList />
      </div>
      <LogoutButton />
    </>
  );
}
