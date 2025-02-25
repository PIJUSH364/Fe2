import { useState } from "react";
import { MdRefresh } from "react-icons/md";

export default function ResetButton({ handleRest }) {
    const [isRotating, setIsRotating] = useState(false);

    return (
        <button
            onMouseDown={() => setIsRotating(true)}
            onMouseUp={() => setIsRotating(false)}
            onClick={handleRest}
            className="font-nunito flex items-center gap-2 text-white bg-black hover:bg-gray-700 text-sm px-4 py-2 h-8 rounded-md"
        >
            <MdRefresh
                className={`transition-transform duration-300 ease-in-out ${isRotating ? "rotate-180" : ""
                    }`}
            />
            Reset
        </button>
    );
}
