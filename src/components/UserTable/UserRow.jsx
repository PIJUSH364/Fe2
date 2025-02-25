import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_URLS from "../../utils/constant/UrlConstant";
import TableCell from "./TableCell";
import DropDown from "./DropDown";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
    resetFilterValue,
    ResetPaginationMetaData,
} from "../../features/users/userSlice";

const UserRow = ({ user, setShouldShow, index }) => {
    const dispatch = useDispatch();

    async function updateUser(data) {
        try {
            const res = await axios.put(API_URLS.STUDENT.UPDATE, data);
            toast.success(res.data.message, {
                position: "bottom-right",
            });
            dispatch(resetFilterValue());
            dispatch(ResetPaginationMetaData());
        } catch (err) {
            // console.error(err);
            toast.error("Error updating user data.");
        }
    }

    return (
        <tr className="border-b hover:bg-gray-50" key={index}>
            {/* Checkbox */}
            {/* <td className="p-2 text-center align-middle ">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(user.id)}
                    className="w-4 h-4 cursor-pointer"
                />
            </td> */}

            {/* User Details */}

            <td className="p-2 align-middle">
                <p className="font-medium text-[0.8rem] sm:text-base text-gray-900">
                    {user.name}
                </p>
            </td>

            {/* Access / Role Assignment Dropdown */}
            <td className="p-2 align-middle  text-left">
                <p className="text-[0.8rem] sm:text-sm text-gray-500">{user.email}</p>
            </td>

            {/* Last Active */}
            <TableCell date={user.updatedAt} />

            {/* Date Added */}
            <TableCell date={user.createdAt} />

            <td className="p-2 text-center align-middle hidden sm:table-cell  md:table-cell">
                <DropDown setShouldShow={setShouldShow} user={user}>
                    <div className="p-2 rounded-full hover:bg-gray-200">
                        <FiMoreVertical className="text-gray-600" />
                    </div>
                </DropDown>
            </td>
        </tr>
    );
};



export default UserRow;
