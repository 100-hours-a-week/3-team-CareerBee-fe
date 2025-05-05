import { PiBookOpenText, PiMedalMilitary, PiMapTrifold, PiShoppingCartSimple, PiUser } from "react-icons/pi";

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
};
const navItems: NavItem[] = [
    { name: 'Interview', href: '/interview', icon: <PiBookOpenText className="iconSize-default" /> },
    { name: 'Ranking', href: '/competition', icon: <PiMedalMilitary className="iconSize-default" /> },
    { name: 'Home', href: '/', icon: <PiMapTrifold className="iconSize-default" /> },
    { name: 'Store', href: '/store', icon: <PiShoppingCartSimple className="iconSize-default" /> },
    { name: 'My Page', href: '/my', icon: <PiUser className="iconSize-default" /> },
];

export const Navbar = () => {
    return (
        <div className="flex items-center justify-between px-8 h-16 w-full gap-2">
            {navItems.map((item) => (
                <a key={item.name} href={item.href}>
                    {item.icon}
                </a>
            ))}
        </div>
    );
}
