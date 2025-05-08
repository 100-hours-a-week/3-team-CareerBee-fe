import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Navbar } from '@/components/layout/navbar';
import { useAuthStore } from '@/store/auth';


export default function MainLayout() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = useAuthStore((state) => state.token);
  
  useEffect(() => {
    // const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const headerType = (() => {
    if (location.pathname === '/login') return 'login';
    if (location.pathname === '/' && isLoggedIn) return 'main';
    if (location.pathname === '/' && !isLoggedIn) return 'login';
    if (location.pathname.startsWith('/company')) return 'down';
    if (location.pathname.startsWith('/notification')) return 'nav';
    return 'minimal';
  })();
  const showNavbar = () => {
    if (location.pathname.startsWith('/competition/entry')) return false;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[600px] w-full mx-auto bg-background shadow-sides">
      
      <Header type={headerType} hasNewNotification={false} point={100} />
      <main className="grow flex flex-col w-full px-4 h-[calc(100vh-8rem)] overflow-auto">
        <Outlet />
      </main>
      {showNavbar() ? <Navbar /> : null}

    </div>
  );
}
