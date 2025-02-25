import React from "react";

const SidebarItem = ({ icon: Icon, label }) => {
    return (
        <li className="sidebar-nav-item " role="menuitem">
            <Icon aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
        </li>
    );
};

export default SidebarItem;
