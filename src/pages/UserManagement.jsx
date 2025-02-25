import React, { useState } from "react";
import UserTable from "../components/UserTable/UserTable";
import Pagination from "../components/Pagination/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";
import TableHeaderAction from "../components/TableHeaderAction";

const UserManagement = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isRest, setIsRest] = useState(false);
    const [localPageSize, setLocalPageSize] = useState(5);

    return (
        <DashboardLayout>
            <div className="mb-4">
                <h2 className="text-base sm:text-xl font-semibold  font-nunito">Student Management</h2>
                <p className="text-[10px] sm:text-sm font-extralight text-gray-500">
                    Manage your student and their Marks here.
                </p>
            </div>
            <TableHeaderAction setIsRest={setIsRest} setLocalPageSize={setLocalPageSize} />
            <UserTable
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                isRest={isRest}
            />
            <Pagination
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                localPageSize={localPageSize}
                setLocalPageSize={setLocalPageSize}
            />
        </DashboardLayout>
    );
};

export default UserManagement;
