import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Role, Status } from "../../../utils/method/helper";
import { useFetchUsers } from "../../custom/Hook/useFetchUsers";
import { useDispatch, useSelector } from "react-redux";
import {
    resetFilterValue,
    ResetPaginationMetaData,
    setFilterValue,
} from "../../../features/users/userSlice";

export default function FilterUserModel({ setShouldShow }) {
    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { fetchUser } = useFetchUsers();
    const { role, status, search } = useSelector(
        (state) => state.user.filterData
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef1.current &&
                !dropdownRef1.current.contains(event.target) &&
                dropdownRef2.current &&
                !dropdownRef2.current.contains(event.target)
            ) {
                setIsOpen1(false);
                setIsOpen2(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFilter = async () => {
        dispatch(ResetPaginationMetaData());
        setIsLoading(true);
        await fetchUser();
        setShouldShow(false);
        setIsLoading(false);
    };

    return (
        <div className="modalBackground flex justify-center items-center">
            <div className="max-w-2xl w-full min-h-[200px] rounded-lg border bg-white px-10 pt-14 pb-10 shadow-lg relative">
                {/* Close Button */}
                <button
                    type="button"
                    className="absolute top-2 right-2 text-black text-2xl p-2 hover:bg-gray-200 rounded-full"
                    onClick={() => {
                        dispatch(resetFilterValue());
                        setShouldShow(false);
                    }}
                >
                    <AiOutlineClose />
                </button>

                <div className="flex flex-row justify-between gap-4">
                    {/* First Dropdown */}
                    <div className="relative flex-1" ref={dropdownRef1}>
                        <button
                            onClick={() => {
                                setIsOpen1(!isOpen1);
                                setIsOpen2(false);
                            }}
                            className="whitespace-nowrap w-full font-nunito bg-white border border-gray-300 rounded-md p-2 text-left flex justify-between items-center shadow-sm"
                        >
                            {role ? role : "Filter by Role"}
                            <span className="ml-auto text-gray-400">&#9662;</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen1 && (
                            <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-20">
                                <ul className="max-h-40 overflow-auto">
                                    {Role.map((option, index) => (
                                        <li
                                            key={index}
                                            className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                dispatch(
                                                    setFilterValue({ key: "role", value: option })
                                                );
                                                setIsOpen1(false);
                                            }}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Second Dropdown */}
                    <div className="relative flex-1" ref={dropdownRef2}>
                        <button
                            onClick={() => {
                                setIsOpen2(!isOpen2);
                                setIsOpen1(false);
                            }}
                            className=" whitespace-nowrap w-full font-nunito bg-white border border-gray-300 rounded-md p-2 text-left flex justify-between items-center shadow-sm"
                        >
                            {status ? status : "Filter by Status"}
                            <span className="ml-auto text-gray-400">&#9662;</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen2 && (
                            <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-20">
                                <ul className="max-h-40 overflow-auto">
                                    {Status.map((option, index) => (
                                        <li
                                            key={index}
                                            className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                dispatch(
                                                    setFilterValue({ key: "status", value: option })
                                                );
                                                setIsOpen2(false);
                                            }}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end mt-6 gap-4">
                    <button
                        onClick={() => {
                            dispatch(resetFilterValue());
                            setShouldShow(false);
                        }}
                        disabled={isLoading}
                        className="font-nunito border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out text-base px-6 py-2 h-9 rounded-md shadow-sm flex items-center justify-center"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleFilter}
                        disabled={!(status || role) || isLoading} // Allow at least one selection
                        className={`cursor-pointer font-nunito border border-transparent bg-black text-white 
                hover:bg-gray-800  duration-300 ease-in-out text-base px-6 py-2 h-9 
                rounded-md shadow-md flex items-center justify-center 
                disabled:opacity-50 disabled:cursor-not-allowed
                transform transition-all`}
                    >
                        {isLoading ? "Loading..." : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    );
}
