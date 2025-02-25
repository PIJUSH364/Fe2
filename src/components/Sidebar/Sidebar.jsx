import React, { useEffect, useState } from "react";
import {
    FaUsers,
    FaCog,
    FaHome,
    FaPaintBrush,
    FaPlug,
    FaClock,
    FaBell,
    FaLock,
    FaKey,
    FaMoneyBill,
    FaFileImport,
    FaFileExport,
    FaBook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../common/childComponent/SidebarItem";
import { CiMenuFries } from "react-icons/ci";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 770) {
                setIsOpen(false);
            } else if (window.innerWidth < 770 && window.innerWidth > 300) {
                setIsOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Ensure it's set correctly on first render

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div>
            {isOpen && (
                <div
                    className="bg-transparent bg-none p-1 pt-6 absolute cursor-pointer"
                    aria-label="Sidebar navigation"
                >
                    {" "}
                    <CiMenuFries
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    />
                </div>
            )}
            {!isOpen && (
                <aside
                    className="w-20 md:w-64 p-6 sm:p-3 h-screen bg-white shadow-md flex flex-col font-nunito "
                    aria-label="Sidebar navigation"
                >
                    <div className="font-semibold mb-4 text-sm sm:text-xl inline sm:hidden cursor-pointer">
                        <CiMenuFries
                            onClick={() => {
                                setIsOpen(!isOpen);
                            }}
                        />
                    </div>
                    <h2 className="font-semibold mb-4 text-sm sm:text-xl hidden sm:inline">
                        Admin CMS
                    </h2>

                    {/* Navigation Container */}
                    <nav
                        className="flex-1 flex flex-col justify-between"
                        aria-label="Main navigation"
                    >
                        <ul className="space-y-4 flex-1 flex flex-col justify-between">
                            {/* Group 1 */}
                            <div
                                className="space-y-4"
                                role="group"
                                aria-labelledby="general-section"
                            >
                                <div className="flex flex-col space-y-2">
                                    <li
                                        id="general-section"
                                        className="sidebar-nav-group-title hidden sm:inline"
                                        role="presentation"
                                    >
                                        GENERAL
                                    </li>

                                    <SidebarItem icon={FaHome} label="Dashboard" />
                                    <SidebarItem icon={FaPaintBrush} label="Appearance" />
                                    <SidebarItem icon={FaPlug} label="Connections" />
                                    <SidebarItem icon={FaClock} label="Timezones" />
                                    <SidebarItem icon={FaBell} label="Notifications" />
                                </div>

                                <div
                                    className="flex flex-col space-y-2"
                                    role="group"
                                    aria-labelledby="druta-section"
                                >
                                    <li
                                        id="druta-section"
                                        className="sidebar-nav-group-title hidden sm:inline "
                                        role="presentation"
                                    >
                                        DRUTA VENTURES
                                    </li>
                                    <li
                                        className="sidebar-nav-item"
                                        role="menuitem"
                                        onClick={() => navigate("/users")}
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === "Enter" && navigate("/users")}
                                        aria-label="User Management"
                                    >
                                        <FaUsers aria-hidden="true" />{" "}
                                        <span className="hidden sm:inline">User Management</span>
                                    </li>

                                    <SidebarItem icon={FaLock} label="Security & Access" />
                                    <SidebarItem icon={FaKey} label="Authentication" />
                                    <SidebarItem icon={FaMoneyBill} label="Payments" />
                                    <SidebarItem icon={FaFileImport} label="Import Data" />
                                    <SidebarItem icon={FaFileExport} label="Export Data" />
                                </div>
                            </div>

                            {/* Group 2 - Always at Bottom */}
                            <div
                                className="space-y-2"
                                role="group"
                                aria-labelledby="settings-section"
                            >
                                <SidebarItem icon={FaCog} label="Settings" />
                                <SidebarItem icon={FaBook} label="Documentation" />
                            </div>
                        </ul>
                    </nav>
                </aside>
            )}
        </div>
    );
};

export default Sidebar;
