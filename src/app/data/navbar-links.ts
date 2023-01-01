import { NavBarLink } from "src/app/models/navbar-link";
// TODO Determine why these need to be ignored?
// @ts-ignore
import homeIcon from "../../icons/home-icon";
// @ts-ignore
import editIcon from "../../icons/edit-icon";

export const NavBarLinks: NavBarLink[] = [
    {
        pageRoute: "/",
        icon: homeIcon,
        altText: "Home icon",
    },
    {
        pageRoute: "/edit",
        icon: editIcon,
        altText: "Edit Icon",
    },
];
