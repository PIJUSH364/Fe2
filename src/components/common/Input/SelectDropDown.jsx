import React from 'react'
import { Role } from '../../../utils/method/helper';

export default function SelectDropDown({ role, handleDropDownChange }) {
    return (
        <select
            value={role}
            onChange={handleDropDownChange}
            className="px-3 py-1 text-sm rounded-full border border-gray-300 focus:outline-none 
                       focus:ring-1 focus:ring-slate-300 bg-white cursor-pointer"
        >
            {Role.map((option, index) => (
                <option key={index} value={option.toLowerCase()} className="font-nunito">
                    {option}
                </option>
            ))}
        </select>
    )
}
