import noProfile from '/assets/no-profile.png';
import point from '@/features/Member/notification/image/point.png';
import { PiCaretRight } from 'react-icons/pi';

// import { useAuthStore } from '@/features/Member/auth/store/auth';
// import { useCompanyStore } from '@/store/company';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { logout } from '@/features/Member/auth/utils/logout';
import WishCompanyList from './components/wishCompanyList';

import { useUserInfo } from '@/hooks/useUserInfo';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function Mypage() {
  // const token = useAuthStore((state) => state.token);

  const { data: userInfo } = useUserInfo();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    // console.log("hello mypage")
  }, []);

  // const { setIsBookmarked } = useCompanyStore();
  // const companies = [...Array(0)];

  return (
    <>
      <div className="flex flex-col grow">
        <div className="flex items-center h-fit px-6 py-4 gap-4 border border-transparent border-b-border/30">
          <img
            src={userInfo?.profileUrl || noProfile}
            className="bg-white rounded-full w-16 h-16 object-cover"
            alt="프로필 이미지"
          ></img>
          <div className="flex flex-col my-auto mr-auto text-text-primary gap-1">
            <div className="flex items-center gap-1 [&_svg]:size-5">
              <div className="text-xl my-auto font-bold">{userInfo?.nickname || '닉네임'}</div>
              <Button
                variant="icon"
                label={<PiCaretRight className="text-text-secondary" />}
                className="p-0 m-0 h-full"
                onClick={() => {
                  window.location.href = '/my/account';
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <img src={point} className="w-4 h-4 inline-block" alt="포인트 아이콘" />
              <div className="text-sm">{userInfo?.point || 0}</div>
            </div>
          </div>
          <Button
            label="내 이력 조회"
            variant="primary"
            className="text-sm rounded-xl px-6"
            onClick={() => {
              window.location.href = '/resume/upload';
            }}
          />
        </div>
        <WishCompanyList />
      </div>

      <Modal
        trigger={
          <Button label="로그아웃" size="sm" variant="link" className="mx-16 mb-8 underline" />
        }
        title="로그아웃 하시겠어요?"
        description={
          <>
            다음에 서비스를 더 편하게 이용하시려면
            <br />
            로그인 상태를 유지해 주세요.
          </>
        }
        cancelText="되돌아가기"
        actionText="로그아웃 하기"
        cancelButton={false}
        onAction={logout}
      />
    </>
  );
}
