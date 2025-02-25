import React from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";

const Breadcrumbs = ({ title = "User Management" }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-gray-600">
                <FaHome className="hidden sm:block" /> <FaChevronRight className="mx-2" /> <span className="text-sm sm:text-lg">{title}</span>
            </div>
            <div className="flex items-center gap-2">
                <img

                    src={"https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"}
                    alt={"admin-img"} className="w-8 h-8 rounded-md "
                />
                <span className="text-sm font-medium hidden sm:block">
                    Florence Shaw
                </span>

            </div>
        </div>
    );
};

export default Breadcrumbs;
