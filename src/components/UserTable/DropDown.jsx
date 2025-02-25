import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import {
  FiUser,
  FiEdit,
  FiSettings,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setModalStatus, setUserDetails } from "../../features/users/userSlice";
import { allModalStatus } from "../../utils/enum";
import * as XLSX from "xlsx";

export default function DropDown({ children, setShouldShow, user }) {
  const dispatch = useDispatch();

  const handleExport = () => {
    const userData = { ...user };
    try {
      delete userData.id;
      delete userData.deletedAt;
      delete userData.createdAt;
      delete userData.updatedAt;

      const worksheet = XLSX.utils.json_to_sheet([userData]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const dataBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(dataBlob, `User.xlsx`);
    } catch (error) {
      console.error("Error exporting user data", error);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="px-2 py-1 outline-none rounded-md">
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white shadow-md rounded-md p-2 border border-gray-200">
          <DropdownMenu.Item className=" text-gray-800 hover:bg-gray-100 cursor-pointer outline-none">
            <button
              className="drop_down_button "
              onClick={() => {
                dispatch(setUserDetails(user));
                dispatch(
                  setModalStatus({
                    key: allModalStatus.VIEW_USER,
                    value: true,
                  })
                );
                setShouldShow(true);
              }}
            >
              <FiUser className="drop_down_button_icon" /> View Profile
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Item className=" text-gray-800 hover:bg-gray-100 cursor-pointer outline-none">
            <button
              className="drop_down_button"
              onClick={() => {
                dispatch(setUserDetails(user));
                dispatch(
                  setModalStatus({
                    key: allModalStatus.EDIT_USER,
                    value: true,
                  })
                );
                setShouldShow(true);
              }}
            >
              <FiEdit className="drop_down_button_icon" /> Edit Details
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Item className=" text-gray-800 hover:bg-gray-100 cursor-pointer outline-none">
            <button
              className="drop_down_button"
              onClick={() => {
                dispatch(setUserDetails(user));
                setShouldShow(true);
                dispatch(
                  setModalStatus({
                    key: allModalStatus.PERMISSION_CHANGE,
                    value: true,
                  })
                );
              }}
            >
              <FiSettings className="drop_down_button_icon" /> Change Permission
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Item className=" text-gray-800 hover:bg-gray-100 cursor-pointer outline-none">
            <button className="drop_down_button" onClick={handleExport}>
              <FiDownload className="drop_down_button_icon" /> Export Details
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Item className=" text-gray-800 hover:bg-gray-100 cursor-pointer outline-none">
            <button
              onClick={() => {
                dispatch(setUserDetails(user));
                setShouldShow(true);
                dispatch(
                  setModalStatus({
                    key: allModalStatus.DELETE_USER,
                    value: true,
                  })
                );
              }}
              className="flex items-center w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
            >
              <FiTrash2 className="mr-2 text-red-500" /> Delete User
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-gray-200" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
