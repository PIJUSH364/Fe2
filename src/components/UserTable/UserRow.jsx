import React, { useState } from "react";
import { requestCounter } from "../../utils/method/helper";
import ToggleSwitch from "../common/Input/ToggleSwitch";
import axios from "axios";
import toast from "react-hot-toast";
import { useFetchUsers } from "../custom/Hook/useFetchUsers";
import SelectDropDown from "../common/Input/SelectDropDown";
import API_URLS from "../../utils/constant/UrlConstant";
import TableCell from "./TableCell";
import DropDown from "./DropDown";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
    resetFilterValue,
    ResetPaginationMetaData,
} from "../../features/users/userSlice";

const UserRow = ({ user, setShouldShow, onSelect, isSelected }) => {
    const [toggleStatus, setToggleStatus] = useState(
        user.status.toUpperCase() === "ACTIVE"
    );
    const [role, setRole] = useState(user.role.toLowerCase());
    const { fetchUser } = useFetchUsers();
    const dispatch = useDispatch();

    const handleToggle = async () => {
        await throttleRequest(async () => {
            setToggleStatus(!toggleStatus);
            const data = {
                status: !toggleStatus ? "active" : "inactive",
                id: user.id,
            };
            await updateUser(data);
        });
    };

    const handleRoleChange = async (role) => {
        await throttleRequest(async () => {
            const data = { role: role.toLowerCase(), id: user.id };
            await updateUser(data);
        });
    };

    async function updateUser(data) {
        try {
            const res = await axios.put(API_URLS.USER.UPDATE, data);
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

    const handleDropDownChange = (e) => {
        const newRole = e.target.value;
        setRole(newRole);
        handleRoleChange(newRole);
    };

    return (
        <tr className="border-b hover:bg-gray-50">
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
            <td className="p-2 flex items-center gap-2 align-middle">
                <img
                    src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFIoQnASEQh51blUTQTG7eAHKzXX6_NizCw&s"
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full hidden sm:inline-block "
                />
                <div>
                    <p className="font-medium text-[0.8rem] sm:text-base text-gray-900">
                        {user.name}
                    </p>
                    <p className="text-[0.8rem] sm:text-sm text-gray-500">{user.email}</p>
                </div>
            </td>

            {/* Access / Role Assignment Dropdown */}
            <td className="p-2 align-middle">
                <SelectDropDown
                    role={role}
                    handleDropDownChange={handleDropDownChange}
                />
            </td>

            {/* Toggle Switch */}
            <td className="p-2 text-center align-middle">
                <ToggleSwitch toggleStatus={toggleStatus} onChange={handleToggle} />
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

const throttleRequest = async (callback) => {
    if (requestCounter.isThrottled) {
        toast.error("Too many requests! Please wait 10 seconds.");
        return;
    }

    requestCounter.count += 1;

    if (requestCounter.count >= 10) {
        requestCounter.isThrottled = true;
        toast.error("Rate limit reached. Waiting 10 seconds...");
        setTimeout(() => {
            requestCounter.count = 0;
            requestCounter.isThrottled = false;
            toast.success("You can make requests again.");
        }, 5000);
    }

    await callback();
};

export default UserRow;
