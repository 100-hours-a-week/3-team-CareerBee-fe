'use client';

import noProfile from '@/public/images/no-profile.png';
import point from '@/public/images/point.svg';
import { PiCaretRight } from 'react-icons/pi';

import { Button } from '@/src/widgets/ui/button';

import { useUserInfo } from '@/src/features/member/api/useUserInfo';

import { useRouter } from 'next/navigation';

export const Profile = () => {
  const { data: userInfo } = useUserInfo();
  const router = useRouter();

  return (
    <>
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
              router.push('/my/account');
            }}
          />
        </div>
        <div className="flex items-center gap-1">
          <img src={point.src} className="w-4 h-4 inline-block" alt="포인트 아이콘" />
          <div className="text-sm">{userInfo?.point || 0}</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
