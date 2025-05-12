import { PiBell, PiBellRinging, PiCoinsDuotone, PiCaretDown, PiCaretLeft } from 'react-icons/pi';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo-with-text-2.png';
interface HeaderProps {
  type: 'main' | 'login' | 'down' | 'downLogin' | 'nav' | 'minimal';
  point?: number;
  hasNewNotification?: boolean;
}

export const Header = ({ type = 'main', point = 0, hasNewNotification = false }: HeaderProps) => {
  const navigate = useNavigate();
  const showUserAssets = type === 'main' || type === 'down' || type === 'nav';
  const isDown = type === 'down' || type === 'downLogin';
  const isNav = type === 'nav' || type === 'minimal';
  const isMinimal = type === 'minimal';

  return (
    <header className={cn('flex items-center justify-between px-4 h-16 w-full')}>
      {/* 왼쪽 영역 */}
      <div className="flex items-center gap-2">
        {isNav ? (
          <button onClick={() => navigate(-1)} style={{ padding: 'inherit' }}>
          <PiCaretLeft className="w-7 h-7 " />
          </button>
        ) : isDown ? (
          <button onClick={() => navigate(-1)} style={{ padding: 'inherit' }}>
          <PiCaretDown className="w-7 h-7" />
            </button>
        ) : null}

        <a href="/">
          <img src={logo} alt="logo" className="h-9" />
        </a>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex items-center gap-3">
        {showUserAssets ? (
          <>
            <div className="flex items-center gap-1">
              <PiCoinsDuotone className="fill-yellow-400 w-9 h-9" />
              <span className="text-base font-semibold">{point}</span>
            </div>
            <a href="/notification" className="relative">
              <PiBell className="w-8 h-8" />
              {hasNewNotification && (
                <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
              )}
            </a>
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
