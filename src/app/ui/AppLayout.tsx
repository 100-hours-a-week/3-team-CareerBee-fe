'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { Header } from '@/src/shared/ui/header';
import { Navbar } from '@/src/shared/ui/navbar';
import { Toaster } from '@/src/widgets/ui/toaster';
import React from 'react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);

  const headerType = (() => {
    if (!pathname) return;
    if (pathname === '/login') return 'navLogin';
    if (pathname === '/' && !!token) return 'main';
    else if (pathname === '/') return 'login';
    if (pathname.startsWith('/company') && !!token) return 'down';
    else if (pathname.startsWith('/company')) return 'downLogin';
    if (pathname.startsWith('/notification')) return 'nav';
    if (pathname.startsWith('/my')) return 'nav';
    if (pathname.startsWith('/service')) return 'nav';
    if (pathname.startsWith('/resume')) return 'nav';
    if (pathname === '/competition' && !!token) return 'main';
    else if (pathname === '/competition') return 'login';
    return 'minimal';
  })();

  const showNavbar = () => {
    if (!pathname) return;

    if (
      pathname.startsWith('/competition/entry') ||
      pathname.startsWith('/my/') ||
      pathname.startsWith('/service') ||
      pathname.startsWith('/resume')
    )
      return false;
    return true;
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col h-dvh fixed inset-0 max-w-[600px] w-full mx-auto bg-background shadow-sides">
        {headerType ? <Header type={headerType} /> : null}
        <main className="flex flex-col flex-1 w-full h-[calc(100dvh-120px)] overflow-y-auto">
          {children}
        </main>
        {showNavbar() ? <Navbar /> : null}
      </div>
    </>
  );
}
