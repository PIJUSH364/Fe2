import { useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
    addUser,
    setTotalPage,
    setTotalUserCount,
    toggleUserDataLoader,
} from "../../../features/users/userSlice";
import API_URLS from "../../../utils/constant/UrlConstant";

export const useFetchUsers = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.user.searchValue);


    const fetchUser = useCallback(
        async (pageIndex = 1, pageSize = 5) => {
            try {
                dispatch(toggleUserDataLoader(true));
                let subQuery = "";


                if (searchValue) subQuery += `&search=${searchValue}`;

                const defaultUrl =
                    `${API_URLS.STUDENT.PAGINATION_DATA}?page=${pageIndex}&pageSize=${pageSize}` +
                    subQuery.toLowerCase();

                const res = await axios.get(defaultUrl);
                if (res.data?.code === 200 && res.data?.data) {
                    toast.success(res.data.message);
                    dispatch(addUser(res.data.data || []));
                    dispatch(setTotalPage(res.data.pagination?.totalPages || 0));
                    dispatch(setTotalUserCount(res.data.pagination?.totalRecords || 0));
                }
            } catch (error) {
                console.error("Error fetching users:", error.message);
                toast.error(error.message);
            } finally {
                dispatch(toggleUserDataLoader(false));
            }
        },
        [searchValue, dispatch]
    );

    return { fetchUser };
};
