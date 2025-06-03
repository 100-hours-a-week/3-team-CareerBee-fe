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
import { PiCaretRight } from 'react-icons/pi';

export default function Mypage() {
  //TODO: 닉네임이랑 포인트 저장하는 로직 리팩토링
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

  const companies = [...Array(0)];

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
            <div className="flex items-center gap-1 [&_svg]:size-5">
              <div className="text-xl my-auto font-bold">{nickname}</div>
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
              <div className="text-sm">{pointAmount}</div>
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
        <div className="flex flex-col w-full items-center justify-center px-6 py-3 gap-2 border border-transparent border-b-border/30">
          <div className="text-base font-bold w-full items-start">관심 기업</div>
          <div className="flex items-start justify-start w-full overflow-x-auto gap-2 pb-1">
            {companies && companies.length > 0 ? (
              companies.map(() => (
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
              ))
            ) : (
              <div className="flex justify-center text-sm text-text-secondary py-2 w-full">
                지도에서 관심 기업을 추가해보세요!
              </div>
            )}
          </div>
        </div>
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
