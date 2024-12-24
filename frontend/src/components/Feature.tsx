import { ReactElement } from "react"

interface featureProps {
    icon: ReactElement;
    title: string;
    description: string
}

const Feature = (props: featureProps) => {
    return (
        <div className="w-96 h-72 bg-white m-auto mt-12 hover:shadow-lg flex justify-center rounded-xl items-center ">
            <div className="w-[75%] h-[80%]">
                <div className="flex flex-start mt-3">
                    <div className="w-16 h-16 text-blue-700 font-bold rounded-lg flex justify-center items-center bg-blue-100">
                        {props.icon}
                    </div>
                </div>
                <div className="font-semibold mt-6 text-2xl">
                    <h3>{props.title}</h3>
                </div>
                <div className="text-xl mt-3 text-gray-600">
                    <h4>{props.description}</h4>
                </div>
            </div>
        </div>
    )
}

export default Feature