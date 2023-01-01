import { NavBarLink } from "src/app/models/navbar-link";
// TODO Determine why these need to be ignored?
// @ts-ignore
import homeIcon from "src/icons/home-icon";
// @ts-ignore
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
    {
        pageRoute: "/edit",
        icon: editIcon,
        altText: "Edit Icon",
    },
];
