import { PiBookOpenText, PiMedalMilitary, PiMapTrifold, PiShoppingCartSimple, PiUser } from "react-icons/pi";

export const Navbar = () => {
    return(
    <div className="flex items-center justify-between px-4 h-16 w-full gap-2">
        <a href="/interview">
            <PiBookOpenText className="w-8 h-8" />
        </a>
        <a href="/competition">
            <PiMedalMilitary className="w-8 h-8" />
        </a>
        <a href="/">
            <PiMapTrifold className="w-8 h-8" />
        </a>
        <a href="/store">
            <PiShoppingCartSimple className="w-8 h-8" />
        </a>
        <a href="/my">
            <PiUser className="w-8 h-8" />
        </a>
    </div>
    )
}
