import React, { useCallback, useEffect, useState } from "react";
import UserRow from "./UserRow";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    addUser,
    resetFilterValue,
    ResetPaginationMetaData,
    setModalStatus,
} from "../../features/users/userSlice";
import ViewProfile from "../common/modal/ViewProfile";
import Modal from "../common/modal/Modal";
import UpdateUserModel from "../common/modal/UpdateUserModel";
import { useFetchUsers } from "../custom/Hook/useFetchUsers";
import { useDebouncedEffect } from "../custom/Hook/useDebouncedEffect";
import DeleteModel from "../common/modal/DeleteModel";
import { allModalStatus } from "../../utils/enum";
import toast from "react-hot-toast";
import axios from "axios";
import API_URLS from "../../utils/constant/UrlConstant";
import { CustomSkelton } from "../CustomSkelton";
import CreateMarkModel from "../common/modal/CreateMarkModel";

const UserTable = ({ selectedUsers, setSelectedUsers, isRest }) => {
    const [sortByDesc, setSortByDesc] = useState(true);
    const [shouldShow, setShouldShow] = useState(false);
    const [menuIndex, setMenuIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { fetchUser } = useFetchUsers();
    const users = useSelector((state) => state.user.userList);
    const userDetails = useSelector((state) => state.user.userDetails);
    const userDataLoader = useSelector((state) => state.user.userDataLoader);
    const searchValue = useSelector((state) => state.user.searchValue);
    const { currentPage, pageSize } = useSelector(
        (state) => state.user.paginationMetaData
    );
    const {
        editUserModalStatus,
        addMarkModalStatus,
        viewUserModalStatus,
        bulkDeleteUserModalStatus,
        deleteUserModalStatus,
    } = useSelector((state) => state.user.allModalStatus);

    const handleSort = () => {
        const data = [...users].sort((a, b) =>
            sortByDesc
                ? new Date(a.updatedAt) - new Date(b.updatedAt)
                : new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        dispatch(addUser(data));
    };

    const toggleMenu = (index) => {
        setMenuIndex(index === menuIndex ? -1 : index);
    };

    const handleSelect = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleAllSelect = () => {
        setSelectedUsers((prev) =>
            prev.length === users.length ? [] : [...users.map((user) => user.id)]
        );
    };

    useEffect(() => {
        // alert("First Render");
        fetchUser();
    }, []);

    useEffect(() => {
        if (selectedUsers.length === users.length && selectedUsers.length > 0) {
            dispatch(
                setModalStatus({ key: allModalStatus.BULK_DELETE_USER, value: true })
            );
            setShouldShow(true);
        }
    }, [selectedUsers]);

    useDebouncedEffect(
        () => {
            // alert("Once any value change");
            fetchUser(currentPage, pageSize);
        },
        [isRest, searchValue, currentPage, pageSize],
        2000
    );

    const handleDelete = useCallback(
        async (ids, isBulkDelete) => {
            try {
                setIsLoading(true);
                const response = await axios.delete(API_URLS.STUDENT.DELETE, {
                    data: { ids: [...ids] },
                });
                toast.success(response.data.message, { position: "bottom-right" });
                dispatch(resetFilterValue());
                if (currentPage === 1 && pageSize === 5 && isBulkDelete) {
                    await fetchUser();
                } else {
                    dispatch(ResetPaginationMetaData());
                }
            } catch (error) {
                console.log(error);
                const message =
                    error?.response?.data?.message || "Something went wrong";
                toast.error(message);
            } finally {
                setIsLoading(false);
                setShouldShow(false);
            }
        },
        [setShouldShow, dispatch, fetchUser]
    );

    const handleCancel = () => {
        setSelectedUsers([]);
        dispatch(
            setModalStatus({ key: allModalStatus.BULK_DELETE_USER, value: false })
        );
        setShouldShow(false);
    };

    const handleSingleCancel = () => {
        dispatch(setModalStatus({ key: allModalStatus.DELETE_USER, value: false }));
        setShouldShow(false);
    };

    return (
        <div className="rounded-lg border border-gray-200 overflow-scroll  md:overflow-y-scroll w-full">
            {viewUserModalStatus && (
                <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
                    <ViewProfile
                        setShouldShow={setShouldShow}
                        menuIndex={menuIndex}
                        toggleMenu={toggleMenu}
                    />
                </Modal>
            )}
            {editUserModalStatus && (
                <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
                    <UpdateUserModel
                        setShouldShow={setShouldShow}
                        menuIndex={menuIndex}
                        toggleMenu={toggleMenu}
                    />
                </Modal>
            )}
            {addMarkModalStatus && (
                <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
                    <CreateMarkModel
                        setShouldShow={setShouldShow}
                        menuIndex={menuIndex}
                        permissionModal={true}
                        toggleMenu={toggleMenu}
                    />
                </Modal>
            )}
            {bulkDeleteUserModalStatus && (
                <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
                    <DeleteModel
                        setShouldShow={setShouldShow}
                        handleCancel={handleCancel}
                        handleDelete={() => handleDelete(selectedUsers, true)}
                        isLoading={isLoading}
                    />
                </Modal>
            )}
            {deleteUserModalStatus && (
                <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
                    <DeleteModel
                        setShouldShow={setShouldShow}
                        handleCancel={handleSingleCancel}
                        handleDelete={() => handleDelete([userDetails?.id], false)}
                        isLoading={isLoading}
                    />
                </Modal>
            )}

            <div className=" max-h-[400px]">
                {userDataLoader ? (
                    <CustomSkelton />
                ) : (
                    <>
                        {users?.length > 0 ? (
                            <table className="min-w-full table-fixed border-collapse">
                                {/* Sticky Header */}
                                <thead className="sticky top-0  z-10 shadow-sm">
                                    <tr className="bg-gray-100 text-left">
                                        {/* <th className="p-3 rounded-tl-lg ">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.length === users.length}
                                                onChange={handleAllSelect}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                        </th> */}
                                        <th className="p-3 font-nunito whitespace-nowrap">
                                            User Name
                                        </th>
                                        <th className="p-3 font-nunito text-left">Email</th>

                                        <th
                                            className="p-3 font-nunito cursor-pointer "
                                            onClick={() => {
                                                handleSort();
                                                setSortByDesc(!sortByDesc);
                                            }}
                                        >
                                            <div className=" items-center gap-1 hidden sm:inline-flex  md:inline-flex whitespace-nowrap">
                                                Last Active
                                                {sortByDesc ? (
                                                    <FaArrowDown className="text-gray-600" />
                                                ) : (
                                                    <FaArrowUp className="text-gray-600" />
                                                )}
                                            </div>
                                        </th>
                                        <th className="p-3 font-nunito hidden sm:table-cell  md:table-cell whitespace-nowrap">
                                            Date Added
                                        </th>
                                        <th className="p-3 font-nunito rounded-tr-lg hidden sm:table-cell  md:table-cell">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                {/* Scrollable Table Body */}
                                <tbody className=" overflow-y-auto max-h-[300px] w-full cursor-pointer">
                                    {users.map((user) => (
                                        <UserRow user={user} setShouldShow={setShouldShow} />
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <CustomSkelton msg="No record found!   :)" />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserTable;
