import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function CloseModel({ CloseModel }) {
    return (
        <div className="mb-4">
            <button
                type="button"
                className="absolute top-2 right-2 text-black text-2xl p-2 hover:bg-gray-200 rounded-full"
                onClick={CloseModel}
            >
                <AiOutlineClose />
            </button>
        </div>
    );
}
