import { ErrorMessage, Field } from 'formik'
import React from 'react'

export default function SelectInputField({ label, name, disabled = false, optionList = [] }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-black">{label}</label>
            <Field
                as="select"
                name={name}
                id={name}
                disabled={disabled}
                className={`mt-1 outline-none block w-full border border-gray-200 rounded-md shadow-sm sm:text-sm text-black p-2
                 ${disabled ? "bg-gray-100 cursor-not-allowed" : "focus:ring-black focus:border-black"}`}
            >
                {optionList.map((item, index) => <option value={item.toLowerCase()} key={index}>{item}</option>)}
            </Field>
            <ErrorMessage name={name} component="div" className="error_msg" />
        </div>
    )
}



