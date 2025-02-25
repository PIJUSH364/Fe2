import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import InputField from "../Input/InputField";
import axios from "axios";
import toast from "react-hot-toast";
import { useFetchUsers } from "../../custom/Hook/useFetchUsers";
import { useDispatch, useSelector } from "react-redux";
import SelectInputField from "../Input/SelectInputField";
import API_URLS from "../../../utils/constant/UrlConstant";
import {
    resetFilterValue,
    ResetPaginationMetaData,
} from "../../../features/users/userSlice";

const UpdateUserModel = ({ setShouldShow }) => {
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector((state) => state.user.userDetails);
    const { currentPage, pageSize } = useSelector(
        (state) => state.user.paginationMetaData
    );
    const { fetchUser } = useFetchUsers();
    const dispatch = useDispatch();
    const { name, email, id } = user;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
    });

    const handleUpdateUser = (values, setSubmitting) => {
        setIsLoading((prev) => !prev);
        axios
            .put(API_URLS.STUDENT.UPDATE, { ...values, id })
            .then(async (res) => {
                setShouldShow(false);
                toast.success(res.data.message, {
                    position: "bottom-right",
                });
                dispatch(resetFilterValue());

                if (currentPage === 1 && pageSize === 5) {
                    await fetchUser(1, 5);
                } else {
                    dispatch(ResetPaginationMetaData());
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || "Something went wrong";
                toast.error(message);
            })
            .finally(() => {
                setSubmitting(false);
                setIsLoading((prev) => !prev);
            });
    };

    return (
        <Formik
            initialValues={{
                name: name,
                email: email,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleUpdateUser(values, setSubmitting);
            }}
        >
            {({ isSubmitting }) => (
                <div className="modalBackground flex justify-center items-center py-5">
                    <Form className="w-full max-w-sm mx-auto p-6 bg-white shadow-lg rounded-md relative">
                        <button
                            type="button"
                            className="absolute top-4 right-4 text-gray-500 text-xl"
                            onClick={() => setShouldShow(false)}
                        >
                            <AiOutlineClose />
                        </button>

                        <InputField
                            label="Name"
                            name="name"
                            placeholder="Enter your name"
                            disabled={isLoading}
                        />
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your Email"
                            disabled={isLoading}
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`modal_submit_btn ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default UpdateUserModel;
