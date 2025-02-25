import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import InputField from "../Input/InputField";
import axios from "axios";
import toast from "react-hot-toast";
import { useFetchUsers } from "../../custom/Hook/useFetchUsers";
import {
    resetFilterValue,
    ResetPaginationMetaData,
} from "../../../features/users/userSlice";
import { useDispatch } from "react-redux";
import API_URLS from "../../../utils/constant/UrlConstant";

const UserModel = ({ setShouldShow }) => {
    const { fetchUser } = useFetchUsers();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
    });

    const handleAddUser = (values, setSubmitting) => {
        setIsLoading((prev) => !prev);
        axios
            .post(API_URLS.USER.CREATE, values)
            .then(async (res) => {
                toast.success(res.data.message, {
                    position: "bottom-right",
                });
                setShouldShow(false);
                dispatch(ResetPaginationMetaData());
                dispatch(resetFilterValue());
                await fetchUser(1, 5);
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
            initialValues={{ name: "", email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleAddUser(values, setSubmitting);
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
                            disabled={isLoading}
                            label="Name"
                            name="name"
                            placeholder="Enter your name"
                        />
                        <InputField
                            disabled={isLoading}
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your Email"
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`modal_submit_btn ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isLoading ? "Saving..." : "Continue"}
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default UserModel;
