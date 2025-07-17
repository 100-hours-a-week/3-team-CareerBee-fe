import {
  PiBookOpenTextLight,
  PiMedalMilitaryLight,
  PiMapTrifoldLight,
  PiShoppingCartSimpleLight,
  PiUserLight,
} from 'react-icons/pi';

import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useUiStore } from '@/src/shared/model/ui';

import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: React.ReactNode;
}
const getNavItems = (token: string | null): NavItem[] => [
  {
    id: 'Interview',
    title: '면접 대비',
    href: '/interview',
    icon: <PiBookOpenTextLight className="iconSize-default" />,
  },
  {
    id: 'Ranking',
    title: '대회',
    href: '/competition',
    icon: <PiMedalMilitaryLight className="iconSize-default" />,
  },
  {
    id: 'Home',
    title: '지도',
    href: '/',
    icon: <PiMapTrifoldLight className="iconSize-default" />,
  },
  {
    id: 'Shop',
    title: '상점',
    href: '/shop',
    icon: <PiShoppingCartSimpleLight className="iconSize-default" />,
  },
  ...(token
    ? [
        {
          id: 'My Page',
          title: '마이페이지',
          href: '/my',
          icon: <PiUserLight className="iconSize-default" />,
        },
      ]
    : [
        {
          id: 'Login Required',
          title: '마이페이지',
          href: '/login-required',
          icon: <PiUserLight className="iconSize-default" />,
        },
      ]),
];

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore.getState().token;
  const navItems = getNavItems(token);
  const setMapPressedFromNavbar = useUiStore((state) => state.setMapPressedFromNavbar);
  const isCompanyDetailPage = pathname?.startsWith('/company/');

  return (
    <div className="flex items-center justify-between px-8 h-16 mb-2 w-full gap-2 bg-background">
      {navItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-0.5 justify-center items-center [&_svg]:size-7"
        >
          <button
            onClick={(e) => {
              const isSamePath = pathname === item.href;

              if (isSamePath) return;
              if (isCompanyDetailPage && item.href === '/') {
                e.preventDefault();
                setMapPressedFromNavbar(true);
                setTimeout(() => {
                  router.push(item.href);
                  setMapPressedFromNavbar(false);
                }, 400);
              } else {
                router.push(item.href);
              }
            }}
          >
            {item.icon}
          </button>
          <div className="text-xs text-text-primary">{item.title}</div>
        </div>
      ))}
    </div>
  );
};
