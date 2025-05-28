// import axios from "axios";
import { instance as axios } from '@/features/Member/auth/utils/axios';

import { useAuthStore } from '@/features/Member/auth/store/auth';
import { Button } from '@/components/ui/button';
import noProfile from '/assets/no-profile.png';
import { Modal } from '@/components/ui/modal';
import { useState, useEffect } from 'react';
import { logout } from '@/features/Member/auth/utils/logout';

export default function Mypage() {
  const token = useAuthStore((state) => state.token);
  const [nickname, setNickname] = useState<string>('닉네임');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNickname(res.data.data.nickname);
      } catch (err) {
        console.error('유저 정보 조회 실패:', err);
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <>
      <div className="flex flex-col grow">
        <div className="flex h-fit px-8 py-4 gap-4 border border-transparent border-b-border/30">
          <img src={noProfile} className="bg-white rounded-full w-16 h-16 object-fill"></img>
          <div className="flex flex-col my-auto text-text-primary gap-1">
            <div className="text-xl my-auto font-bold">{nickname}</div>
            <div className="text-sm">포인트 0</div>
          </div>
        </div>
        <p className="w-full flex items-center justify-center text-xl font-black text-border pt-2">
          . . .
        </p>
      </div>

      <Modal
        trigger={<Button label="로그아웃" size="sm" variant="link" className="mx-16 mb-8" />}
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
