import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Navbar } from '@/components/layout/navbar';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { Toaster } from '@/components/ui/toaster';
import { useGlobalErrorToast } from '@/hooks/useGlobalErrorToast';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function MainLayout() {
  useGlobalErrorToast();
  const location = useLocation();

  const token = useAuthStore((state) => state.token);

  const headerType = (() => {
    if (location.pathname === '/login') return 'navLogin';
    if (location.pathname === '/' && !!token) return 'main';
    else if (location.pathname === '/') return 'login';
    if (location.pathname.startsWith('/company') && !!token) return 'down';
    else if (location.pathname.startsWith('/company')) return 'downLogin';
    if (location.pathname.startsWith('/notification')) return 'nav';
    if (location.pathname.startsWith('/my')) return 'nav';
    if (location.pathname.startsWith('/service')) return 'nav';
    if (location.pathname.startsWith('/resume')) return 'nav';
    if (location.pathname === '/competition' && !!token) return 'main';
    else if (location.pathname === '/competition') return 'login';
    return 'minimal';
  })();

  const { data: userInfo } = useUserInfo();
  const showNavbar = () => {
    if (
      location.pathname.startsWith('/competition/entry') ||
      location.pathname.startsWith('/my/') ||
      location.pathname.startsWith('/service') ||
      location.pathname.startsWith('/resume')
    )
      return false;
    return true;
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col h-dvh fixed inset-0 max-w-[600px] w-full mx-auto bg-background shadow-sides">
        <Header
          type={headerType}
          hasNewNotification={userInfo?.hasNewAlarm}
          point={userInfo?.point}
        />
        <main className="flex flex-col flex-1 w-full h-[calc(100dvh-120px)] overflow-auto">
          <Outlet key={location.pathname} />
        </main>
        {showNavbar() ? <Navbar /> : null}
      </div>
    </>
  );
}
