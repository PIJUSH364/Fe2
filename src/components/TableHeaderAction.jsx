import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import Modal from "./common/modal/Modal";
import UserModel from "./common/modal/UserModel";
import toast from "react-hot-toast";
import {
    resetFilterValue,
    ResetPaginationMetaData,
    setSearchValue,
} from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ResetButton from "./ResetButton";

const TableHeaderAction = ({
    title = "All Students",
    setIsRest,
    setLocalPageSize,
}) => {
    const dispatch = useDispatch();
    const totalUserCount = useSelector((state) => state.user.totalUserCount);
    const searchValue = useSelector((state) => state.user.searchValue);

    const [shouldShow, setShouldShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleRest = () => {
        toast.success("Reset successfully");
        setIsRest((prev) => !prev);
        dispatch(ResetPaginationMetaData());
        dispatch(resetFilterValue());
        dispatch(setSearchValue(""));
        setLocalPageSize(5);
    };

    const handleNewUser = () => {
        setIsOpen(true);
        setShouldShow(true);
    };

    return (
        <>
            {isOpen && (
                <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
                    <UserModel setShouldShow={setShouldShow} />
                </Modal>
            )}

            {/* Responsive Container */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start  md:items-center pb-4">
                <h2 className="text-base md:text-lg font-bold font-nunito whitespace-nowrap">{`${title} (${totalUserCount})`}</h2>

                {/* Controls */}
                <div className="flex flex-col  md:flex-row items-start  md:items-center gap-3">
                    {/* Search Input */}
                    <div className={`relative flex items-center `}>
                        <FaSearch className="absolute left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="font-nunito border border-gray-300 outline-none rounded-md px-10 py-2 h-8"
                            value={searchValue}
                            onChange={(e) => {
                                dispatch(setSearchValue(e.target.value.trim()));
                                dispatch(ResetPaginationMetaData());
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Add User Button */}
                        <button
                            onClick={handleNewUser}
                            className="primary-bw-btn px-2 md:px-4 whitespace-nowrap"
                        >
                            <FiPlus />
                            Add Student
                        </button>

                        {/* Reset Button */}
                        <ResetButton handleRest={handleRest} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableHeaderAction;
