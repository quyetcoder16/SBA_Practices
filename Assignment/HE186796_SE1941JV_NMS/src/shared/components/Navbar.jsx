import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    RiDashboardLine,
    RiSettings3Line,
    RiUserLine,
    RiStackLine,
    RiNewspaperLine
} from 'react-icons/ri';

export default function Navbar() {

    const getNavLinkClass = ({ isActive }) => {
        const baseClass = "nav-link d-flex align-items-center px-3 py-2 fs-6 transition-all rounded-3 mb-2";
        return `${baseClass} ${isActive ? "active-style shadow-sm" : "text-secondary"}`;
    };

    const menuItems = [
        { path: "/", label: "Dashboard", icon: <RiDashboardLine /> },
        { path: "/category", label: "Category", icon: <RiStackLine /> },
        { path: "/news", label: "News", icon: <RiNewspaperLine /> },
        { path: "/users", label: "Users", icon: <RiUserLine /> },
        { path: "/settings", label: "Settings", icon: <RiSettings3Line /> },
    ];

    return (
        <div className="mt-4 px-3">
            {menuItems.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.path}
                    className={getNavLinkClass}
                    end={item.path === "/"}
                >
                    <span className="fs-5 d-flex">{item.icon}</span>
                    <span className="ms-3">{item.label}</span>
                </NavLink>
            ))}
        </div>
    );
}