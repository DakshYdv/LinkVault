import DeleteIcon from "../icons/DeleteIcon"
import DocumentsIcon from "../icons/DocumentsIcon";
import LinksIcon from "../icons/LinksIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon"

interface CardProps {
    link: string;
    title: string;
    type: "youtube" | "twitter" | "documents" | "links",
    onDelete?: (title: string, link: string, type: string) => void
}

const Card = (props: CardProps) => {
    const date = new Date()

    return (
        <div className="h-max w-max break-inside-avoid mt-2 flex justify-center items-center rounded-md border-2 border-slate-300 outline-2 outline-black"> {/* outermost div */}
            <div className="flex flex-col h-max w-max min-w-[88%] m-3 rounded-md"> {/*outer div containing all content*/}
                <div className="rounded-md flex justify-between mb-2"> {/* div containing upper section */}
                    <div className="gap-2 flex">
                        {props.type === "youtube" && <YoutubeIcon />}
                        {props.type === "twitter" && <TwitterIcon />}
                        {props.type === "documents" && <DocumentsIcon />}
                        {props.type === "links" && <LinksIcon />}
                        {props.title}
                    </div>
                    <div className="hover:cursor-pointer" onClick={() =>props.onDelete && props.onDelete(props.title, props.link, props.type)}>
                        <DeleteIcon />
                    </div>
                </div>
                <div>   {/* div containing original link */}
                    <a target="_blank" href={props.link} className="text-blue-600">Original Link </a>
                </div>
                <div>
                    {props.type === "twitter" && <blockquote className="twitter-tweet w-full">
                        <a href={props.link.replace('x', 'twitter')}></a> 
                        </blockquote>
                    }
                    {props.type === "youtube" && <iframe width="250" className="rounded-md" src={props.link.replace('watch?v=', 'embed/')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                </div>
                <div className="mt-1 text-gray-500">
                    <h3>Created on - {date.getDate()}/{date.getMonth()}/{date.getFullYear()} </h3>
                </div>
            </div>
            
        </div>
    )
}

export default Card