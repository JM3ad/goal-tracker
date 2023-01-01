import React from "react";
import { Link } from "react-router-dom";

import "src/app/components/navbar.scss";

import { NavBarLink } from "src/app/models/navbar-link";

export interface NavBarProps {
    links: NavBarLink[];
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
    const links = props.links;
    return (
        <div className="nav-bar">
            {links.map((link) => {
                return (
                    <Link
                        key={link.pageRoute}
                        to={link.pageRoute}
                        className="icon"
                    >
                        <link.icon />
                    </Link>
                );
            })}
        </div>
    );
};

export default NavBar;
