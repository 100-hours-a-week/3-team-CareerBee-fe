import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Navbar } from '@/components/layout/navbar';
import { useAuthStore } from '@/store/auth';


export default function MainLayout() {
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  

  const headerType = (() => {
    if (location.pathname === '/login') return 'login';
    if (location.pathname === '/' && !!token) return 'main';
    else if (location.pathname === '/') return 'login';
    if (location.pathname.startsWith('/company') && !!token) return 'down';
    else if (location.pathname.startsWith('/company')) return 'downLogin';
    if (location.pathname.startsWith('/notification')) return 'nav';
    return 'minimal';
  })();
  const point = Number(localStorage.getItem('userPoint')) || 0;
  const hasNewNotification = localStorage.getItem('hasNewAlarm') === 'true';
  const showNavbar = () => {
    if (location.pathname.startsWith('/competition/entry')) return false;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[600px] w-full mx-auto bg-background shadow-sides">
      
      <Header type={headerType} hasNewNotification={hasNewNotification} point={point} />
      <main className="grow flex flex-col w-full h-[calc(100vh-8rem)] overflow-auto"
      style={{
        height: `calc(var(--vh, 1vh) * 100 - 4rem${showNavbar() ? ' - 4rem' : ''})`,
      }}>
        <Outlet />
      </main>
      {showNavbar() ? <Navbar /> : null}

    </div>
  );
}
