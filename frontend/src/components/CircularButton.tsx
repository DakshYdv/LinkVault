interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    size: "md" | "lg",
    onclick?: () => void
}

const variantClasses = {
    "primary": "bg-blue-600 text-white",
    "secondary": "bg-white text-blue-600"
}

const sizeClasses = {
    "md": "px-6 py-2 text-lg",
    "lg": "px-12 py-5 text-xl"
}

const CircularButton = (props: ButtonProps) => {
    return (
        <button onClick={props.onclick} className={` ${variantClasses[props.variant]} ${sizeClasses[props.size]} rounded-full`}>{props.text}</button>
    )
}

export default CircularButton