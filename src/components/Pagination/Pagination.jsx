import { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
    setPaginationMetaData,
    toggleUserDataLoader,
} from "../../features/users/userSlice";
import PageSize from "./PageSize";

const Pagination = ({ setSelectedUsers, localPageSize, setLocalPageSize }) => {
    const dispatch = useDispatch();
    const totalPages = useSelector((state) => state.user.totalPage);
    const users = useSelector((state) => state.user.userList);
    const userDataLoader = useSelector((state) => state.user.userDataLoader);
    const { currentPage, pageSize } = useSelector(
        (state) => state.user.paginationMetaData
    );



    const handlePageSizeChange = async (e) => {
        let value = e.target.value;
        // Prevent negative values & invalid input
        if (isNaN(value) || value < 0) return;
        if (value > 100) value = 100; // Max limit of 100
        setLocalPageSize(value);

        if (value >= 5) {
            setSelectedUsers([]);
            dispatch(setPaginationMetaData({ key: "pageSize", value }));
            dispatch(setPaginationMetaData({ key: "currentPage", value: 1 }));
        }
    };

    const handlePageChange = (number) => {
        if (currentPage === number) return;
        dispatch(
            setPaginationMetaData({
                key: "currentPage",
                value: number,
            })
        );
        dispatch(toggleUserDataLoader(true));
        setSelectedUsers([]);
    };

    const handleNext_prev = (value) => {
        setSelectedUsers([]);
        dispatch(
            setPaginationMetaData({
                key: "currentPage",
                value,
            })
        );
    };

    return (
        <>
            {!userDataLoader && users.length ? (
                <div className="flex justify-center items-center w-full px-6 mt-6 relative">
                    <div className="flex gap-2 items-center absolute left-1/2 transform -translate-x-1/2">
                        <button
                            className="pagination_next_prev"
                            onClick={() => handleNext_prev(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            aria-label="Previous Page"
                            aria-disabled={currentPage === 1}
                        >
                            <GrPrevious />
                        </button>

                        <div className="flex justify-center items-center space-x-2">
                            {!userDataLoader &&
                                Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (number) => (
                                        <button
                                            key={number}
                                            className={`w-6 h-6 p-2 rounded-[4px] text-sm flex items-center justify-center
                                    ${currentPage === number ? "bg-gray-400 text-white" : "bg-gray-200"}`}
                                            onClick={() => handlePageChange(number)}
                                            aria-label={`Page ${number}`}
                                            aria-current={currentPage === number ? "page" : undefined}
                                        >
                                            {number}
                                        </button>
                                    )
                                )}
                        </div>

                        <button
                            className="pagination_next_prev"
                            onClick={() =>
                                handleNext_prev(Math.min(currentPage + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                            aria-label="Next Page"
                            aria-disabled={currentPage === totalPages}
                        >
                            <GrNext />
                        </button>
                    </div>

                    <div className="ml-auto hidden sm:flex">
                        <PageSize
                            localPageSize={localPageSize}
                            setLocalPageSize={setLocalPageSize}
                            handlePageSizeChange={handlePageSizeChange}
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Pagination;
