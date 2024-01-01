import { NavBarLink } from "src/app/models/navbar-link";
import homeIcon from "src/icons/home-icon";
import plusIcon from "src/icons/plus-icon";
import oldIcon from "src/icons/old-icon";

export const NavBarLinks: NavBarLink[] = [
    {
        pageRoute: "/",
        icon: homeIcon,
        altText: "Home icon",
    },
    {
        pageRoute: "/new",
        icon: plusIcon,
        altText: "Plus icon",
    },
    {
        pageRoute: "/old",
        icon: oldIcon,
        altText: "old",
    },
];
