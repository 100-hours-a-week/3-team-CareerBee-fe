import { PiBookOpenText, PiMedalMilitary, PiMapTrifold, PiShoppingCartSimple, PiUser } from 'react-icons/pi';
import { useAuthStore } from '@/store/auth';
interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}
const getNavItems = (token: string | null): NavItem[] => [
  { name: 'Interview', href: '/interview', icon: <PiBookOpenText className="iconSize-default" /> },
  { name: 'Ranking', href: '/competition', icon: <PiMedalMilitary className="iconSize-default" /> },
  { name: 'Home', href: '/', icon: <PiMapTrifold className="iconSize-default" /> },
  { name: 'Store', href: '/store', icon: <PiShoppingCartSimple className="iconSize-default" /> },
  ...(token
    ? [{ name: 'My Page', href: '/my', icon: <PiUser className="iconSize-default" /> }]
    : [{ name: 'Login Required', href: '/login-required', icon: <PiUser className="iconSize-default" /> }]),
];

export const Navbar = () => {
  const token = useAuthStore.getState().token;
  const navItems = getNavItems(token);

  return (
    <div className="flex items-center justify-between px-8 h-16 w-full gap-2 bg-background">
      {navItems.map((item) => (
        <a key={item.name} href={item.href}>
          {item.icon}
        </a>
      ))}
    </div>
  );
};
