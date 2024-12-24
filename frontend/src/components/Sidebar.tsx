import { useNavigate } from "react-router-dom"
import BrainIcon from "../icons/BrainIcon"
import DocumentsIcon from "../icons/DocumentsIcon"
import HomeIcon from "../icons/HomeIcon"
import LinksIcon from "../icons/LinksIcon"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import SidebarItems from "./SidebarItems"
import BookmarkIcon from "../icons/BookmarkIcon"

const Sidebar = () => {
  const navigate = useNavigate()

    return <div className="w-[20%] bg-white min-h-screen border-r-2 justify-center">
    <div className="pt-3 bg-offwhite border-gray-400 flex justify-between items-center"> {/* header div */}
                    <div onClick={() => navigate('/dashboard')} className="flex items-center ml-8 gap-3 hover:cursor-pointer">
                        <BookmarkIcon />
                        <h2 className="font-bold text-2xl">LinkVault</h2>
                    </div>
    </div>
    <div className="mt-7 flex flex-col gap-3 justify-center">
      <SidebarItems onclick={() => navigate('/dashboard')} title="Home" startIcon={<HomeIcon />} />
      <SidebarItems onclick={() => navigate('/dashboard/tweets')} title="Tweets" startIcon={<TwitterIcon />} />
      <SidebarItems onclick={() => navigate('/dashboard/videos')} title="Videos" startIcon={<YoutubeIcon />} />
      <SidebarItems onclick={() => navigate('/dashboard/documents')} title="Documents" startIcon={<DocumentsIcon />} />
      <SidebarItems onclick={() => navigate('/dashboard/links')} title="Links" startIcon={<LinksIcon />} />
    </div>
  </div>
}

export default Sidebar