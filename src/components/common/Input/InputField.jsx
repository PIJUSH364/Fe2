import { ErrorMessage, Field } from 'formik';
import React from 'react';

export default function InputField({ label, name, type = 'text', placeholder = "", disabled = false }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-black">{label}</label>
      <Field
        type={type}
        name={name}
        id={name}
        placeholder={placeholder.trim() || label}
        disabled={disabled}
        className={` mt-1 outline-none block w-full border border-gray-200 rounded-md shadow-sm sm:text-sm text-black p-2
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "focus:ring-black focus:border-black"}`}
      />
      <ErrorMessage name={name} component="div" className="error_msg" />
    </div>
  );
}
