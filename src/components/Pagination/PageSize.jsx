import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PageSize({
    localPageSize,
    setLocalPageSize,
    handlePageSizeChange,
}) {
    const { pageSize } = useSelector((state) => state.user.paginationMetaData);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (localPageSize < 5 || isNaN(localPageSize)) {
                setLocalPageSize(5);
            }
        }, 1500);

        return () => clearTimeout(timeout);
    }, [localPageSize]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (pageSize === 5) {
                setLocalPageSize(5);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [pageSize]);

    return (
        <div className="flex items-center gap-3">
            <label className="text-sm font-medium" htmlFor="pageSize">
                Page Size:
            </label>
            <input
                type="number"
                id="pageSize"
                value={localPageSize}
                onChange={handlePageSizeChange}
                className="w-16 h-8 border border-gray-400 rounded-md p-1 text-center outline-none font-nunito"
                aria-label="Select Page Size"
            />
            <span className="text-sm font-medium font-nunito">/ pages</span>
        </div>
    );
}
