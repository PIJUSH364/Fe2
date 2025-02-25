import React from "react";

const ToggleSwitch = ({ toggleStatus = false, onChange }) => {
    return (
        <div
            className={`relative w-11 h-5 flex items-center cursor-pointer rounded-full transition-all duration-300 
                ${toggleStatus ? "bg-slate-600" : "bg-gray-300"}
            `}
            onClick={onChange}
        >
            {/* Toggle Knob */}
            <div
                className={`absolute w-5 h-5 bg-white border border-gray-500 rounded-full transition-transform duration-300 ${toggleStatus ? "translate-x-6" : "translate-x-1"
                    }`}
            ></div>
        </div>
    );
};

export default ToggleSwitch;
