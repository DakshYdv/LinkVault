import { ReactElement } from "react";

interface ItemsProps {
    title: string;
    startIcon: ReactElement,
    onclick?: () => void
}

const SidebarItems = (props: ItemsProps) => {
    return (
        <div onClick={props.onclick} className="bg-white hover:cursor-pointer text-gray-500 hover:bg-gray-200 text-lg text-extrabold flex items-center py-1 pl-[10%] gap-5 w-[70%] ml-[5%] rounded-md">
            {props.startIcon}
            {props.title}
        </div>
    )
}

export default SidebarItems