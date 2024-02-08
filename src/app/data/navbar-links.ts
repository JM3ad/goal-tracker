import { NavBarLink } from "src/app/models/navbar-link";
import homeIcon from "src/icons/home-icon";
import plusIcon from "src/icons/plus-icon";
import TextIcon from "src/icons/text-icon";

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
        icon: () => TextIcon("Old"),
        altText: "old",
    },
    {
        pageRoute: "/export",
        icon: () => TextIcon("Transfer Data"),
        altText: "Transfer Data",
    },
];
