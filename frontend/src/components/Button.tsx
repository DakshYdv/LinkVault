import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onclick?: () => void
}

const variantClasses = {
    "primary": "bg-purple-200 text-purple-600",
    "secondary": "bg-purple-600 text-gray-200"
}

const Button = (props: ButtonProps) => {
    return (
        <div>
            <button onClick={props.onclick} className={`${variantClasses[props.variant]} px-2 py-1 text-lg gap-2 rounded-md flex items-center text-extrabold border-gray-400`}>
                {props.startIcon}
                {props.text}
            </button>
        </div>
    )
}

export default Button