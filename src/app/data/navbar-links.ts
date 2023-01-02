import { NavBarLink } from "src/app/models/navbar-link";
import homeIcon from "src/icons/home-icon";
import editIcon from "src/icons/edit-icon";
import plusIcon from "src/icons/plus-icon";

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
];
