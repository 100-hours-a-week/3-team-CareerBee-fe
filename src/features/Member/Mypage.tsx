import { useState, useEffect } from 'react';

import { instance as axios } from '@/features/Member/auth/utils/axios';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useCompanyStore } from '@/store/company';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { logout } from '@/features/Member/auth/utils/logout';
import CompanyCard from '@/features/Map/components/CompanyCard';

import noProfile from '/assets/no-profile.png';
import point from '@/features/Member/notification/image/point.png';

export default function Mypage() {
  const token = useAuthStore((state) => state.token);
  const [nickname, setNickname] = useState<string>('닉네임');
  const pointAmount = localStorage.getItem('point') || '0';
  const { setIsBookmarked } = useCompanyStore();

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
        <div className="flex items-center h-fit px-6 py-4 gap-4 border border-transparent border-b-border/30">
          <img
            src={noProfile}
            className="bg-white rounded-full w-16 h-16 object-fill"
            alt="프로필 이미지"
          ></img>
          <div className="flex flex-col my-auto mr-auto text-text-primary gap-1">
            <div className="text-xl my-auto font-bold">{nickname}</div>
            <div className="flex gap-1 items-center">
              <img src={point} className="w-4 h-4 inline-block" alt="포인트 아이콘" />
              <div className="text-sm">{pointAmount}</div>
            </div>
          </div>
          <Button label="내 이력 조회" variant="primary" className="text-sm rounded-xl px-6" />
        </div>
        <div className="flex flex-col w-full items-center justify-center px-6 py-3 gap-2 border border-transparent border-b-border/30">
          <div className="text-base font-bold w-full items-start">관심 기업</div>
          <div className="flex items-start justify-start w-full overflow-x-auto gap-2 pb-1">
            {[...Array(3)].map(() => {
              return (
                <CompanyCard
                  companyId={1}
                  companyName="샘플 기업"
                  bookmarkCount={10}
                  tags={['IT', '개발', '스타트업']}
                  imageUrl="https://via.placeholder.com/150"
                  isCompanyCardList={true}
                  isLoggedIn={!!token}
                  setIsBookmarked={setIsBookmarked}
                />
              );
            })}
          </div>
        </div>
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
