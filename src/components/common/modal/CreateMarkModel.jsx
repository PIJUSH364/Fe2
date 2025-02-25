import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import InputField from "../Input/InputField";
import axios from "axios";
import toast from "react-hot-toast";
import { useFetchUsers } from "../../custom/Hook/useFetchUsers";
import SelectInputField from "../Input/SelectInputField";
import {
    resetFilterValue,
    ResetPaginationMetaData,
} from "../../../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import API_URLS from "../../../utils/constant/UrlConstant";
import { Subjects } from "../../../utils/method/helper";

const CreateMarkModel = ({ setShouldShow }) => {
    const { fetchUser } = useFetchUsers();
    const user = useSelector((state) => state.user.studentDetails);

    if (!user) {
        setShouldShow(false);
        return -1;
    }

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        score: Yup.number()
            .min(0, "Score must be greater than 0")
            .max(100, "Score must be less than 100")
            .required("score is required"),
        subject: Yup.string().required("subject is required"),
    });

    const handleAddMark = (values, setSubmitting) => {
        setIsLoading((prev) => !prev);
        axios
            .post(API_URLS.Mark.CREATE, values)
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
            initialValues={{
                name: user.name,
                score: "",
                subject: String(Subjects[0]).toLowerCase(),
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleAddMark({ ...values, studentId: user.id }, setSubmitting);
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
                            disabled={true}
                            label="Name"
                            name="name"
                            placeholder="Enter your name"
                        />
                        <InputField
                            disabled={isLoading}
                            label="Score"
                            name="score"
                            type="number"
                            placeholder="Enter the score"
                        />
                        <SelectInputField
                            disabled={isLoading}
                            label="Subject"
                            name="subject"
                            optionList={Subjects}
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

export default CreateMarkModel;
