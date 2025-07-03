import { PiBell, PiCaretDown, PiCaretLeft } from 'react-icons/pi';
import logo from '@/public/images/logo-with-title.png';

import { StateBasedModal } from '@/src/shared/ui/modal';

import { useUiStore } from '@/src/shared/model/ui';
import { useCompetitionStore } from '@/src/entities/competition/model/competitionStore';
import { useUserInfo } from '@/src/features/member/api/useUserInfo';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/src/shared/lib/utils';

interface HeaderProps {
  type: 'main' | 'login' | 'down' | 'downLogin' | 'nav' | 'navLogin' | 'minimal';
}

export const Header = ({ type = 'main' }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

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
        router.back();
        setBackPressedFromHeader(false);
      }, 400);
    } else if (pathname?.startsWith('/competition/entry') && !isSubmitted) {
      setShowBackConfirmModal(true);
    } else {
      router.push('/'); // 메인 페이지로 이동
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
                if (pathname?.startsWith('/competition/entry') && !isSubmitted) {
                  setShowBackConfirmModal(true);
                } else {
                  router.back();
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
                router.back();
              }}
            />
          </>
        ) : isDown ? (
          <button
            onClick={() => {
              setBackPressedFromHeader(true);
              setTimeout(() => {
                router.back();
                setBackPressedFromHeader(false);
              }, 400);
            }}
            style={{ padding: 'inherit' }}
          >
            <PiCaretDown className="w-7 h-7" />
          </button>
        ) : null}
        <button onClick={handleLogoClick} className="cursor-pointer px-0">
          <Image src={logo} alt="logo" width="131.5" height="32" />
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
            <Link href="/notification" className="relative">
              <PiBell className="w-8 h-8" />
              {userInfo.hasNewAlarm && (
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
