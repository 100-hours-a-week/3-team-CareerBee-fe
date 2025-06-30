import { PiBell, PiCaretDown, PiCaretLeft } from 'react-icons/pi';
import logo from '@/static/logo-with-text-2.png';

import { StateBasedModal } from '@/components/ui/modal';

import { useUiStore } from '@/store/ui';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { useUserInfo } from '@/hooks/useUserInfo';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface HeaderProps {
  type: 'main' | 'login' | 'down' | 'downLogin' | 'nav' | 'navLogin' | 'minimal';
}

export const Header = ({ type = 'main' }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBackConfirmModal, setShowBackConfirmModal] = useState(false);
  const showUserAssets = type === 'main' || type === 'down' || type === 'nav';
  const isDown = type === 'down' || type === 'downLogin';
  const isNav = type === 'nav' || type === 'minimal' || type === 'navLogin';
  const isMinimal = type === 'minimal';

  const setBackPressedFromHeader = useUiStore((state) => state.setBackPressedFromHeader);

  const { isSubmitted } = useCompetitionStore();

  const handleLogoClick = () => {
    if (isDown) {
      setBackPressedFromHeader(true);
      setTimeout(() => {
        navigate(-1);
        setBackPressedFromHeader(false);
      }, 400);
    } else if (location.pathname.startsWith('/competition/entry') && !isSubmitted) {
      setShowBackConfirmModal(true);
    } else {
      navigate('/'); // 메인 페이지로 이동
    }
  };

  const { data: userInfo } = useUserInfo();

  return (
    <header className={cn('flex items-center justify-between px-4 h-14 w-full')}>
      {/* 왼쪽 영역 */}
      <div className="flex items-center gap-2">
        {isNav ? (
          <>
            <button
              onClick={() => {
                if (location.pathname.startsWith('/competition/entry') && !isSubmitted) {
                  setShowBackConfirmModal(true);
                } else {
                  navigate(-1);
                }
              }}
              style={{ padding: 'inherit' }}
            >
              <PiCaretLeft className="w-7 h-7 " />
            </button>
            <StateBasedModal
              open={showBackConfirmModal}
              onOpenChange={setShowBackConfirmModal}
              title="대회를 정말 종료할까요?"
              description={
                <>종료하면 지금까지 입력한 답변은 모두 삭제되고 다시 참여할 수 없어요.</>
              }
              actionText="종료하기"
              cancelText="계속하기"
              onAction={() => {
                setShowBackConfirmModal(false);
                navigate(-1);
              }}
            />
          </>
        ) : isDown ? (
          <button
            onClick={() => {
              setBackPressedFromHeader(true);
              setTimeout(() => {
                navigate(-1);
                setBackPressedFromHeader(false);
              }, 400);
            }}
            style={{ padding: 'inherit' }}
          >
            <PiCaretDown className="w-7 h-7" />
          </button>
        ) : null}

        <button onClick={handleLogoClick} className="cursor-pointer px-0">
          <img src={logo} alt="logo" className="h-8" />
        </button>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex items-center gap-3">
        {showUserAssets && userInfo ? (
          <>
            <div className="flex items-center gap-2">
              <img src="/assets/coin-small.svg" alt="포인트" className="w-8 h-8 rounded-full" />
              <span className="text-lg font-semibold">{userInfo.point ?? 0}</span>
            </div>
            <Link to="/notification" className="relative">
              <PiBell className="w-8 h-8" />
              {userInfo.hasNewNotification && (
                <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
              )}
            </Link>
          </>
        ) : isMinimal ? null : (
          <a
            href="/login"
            className="text-sm font-semibold hover:underline hover:text-text-primary"
          >
            로그인하기
          </a>
        )}
      </div>
    </header>
  );
};
