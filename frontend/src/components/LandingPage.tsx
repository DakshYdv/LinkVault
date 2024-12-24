import { useNavigate } from "react-router-dom"
import BookmarkIcon from "../icons/BookmarkIcon"
import CustomCollections from "../icons/CustomCollections"
import QuickAccess from "../icons/QuickAccess"
import SecureStorage from "../icons/SecureStorage"
import ShareIcon from "../icons/ShareIcon"
import SmartOrg from "../icons/SmartOrg"
import CircularButton from "./CircularButton"
import Feature from "./Feature"

const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div className="min-w-screen min-h-screen">
            <div className="h-screen"> . {/* first page */}
                <div className="w-full h-[10%] border-b bg-offwhite border-gray-400 flex justify-between items-center"> {/* header div */}
                    <div className="flex items-center ml-8 gap-3">
                        <BookmarkIcon />
                        <h2 className="font-bold text-2xl">LinkVault</h2>
                    </div>
                    <div className="mr-8">
                        <CircularButton variant="primary" size="md" onclick={() => navigate('/signup')} text="Get Started" />
                    </div>
                </div>
                <div className="flex h-[90%] bg-ivory flex-col items-center"> {/* hero section */}
                    <div className="w-[80%] font-bold mt-20 tracking-wide text-center text-6xl">
                        <h1>Save and Organize Your Important Links in One Place</h1>
                    </div>
                    <div className="w-[80%] font-medium mt-6 text-2xl text-gray-500">
                        <h3>Never lose track of your valuable resources. Save, organize, and access your links from anywhere.</h3>
                    </div>
                    <div className="mt-12">
                        <CircularButton variant="primary" onclick={() => navigate('/signup')} text="Start Saving Links" size="lg" />
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-ivory pb-28"> {/* features section */}
                <div className="flex justify-center text-4xl font-bold ">
                    <h3>Everything You Need to Manage Your Links</h3>
                </div>
                <div className="flex flex-wrap mt-12">
                    <Feature icon={<SmartOrg />} title="Smart Organization" description="Categorize your links with tags and folders for easy access and management." />
                    <Feature icon={<ShareIcon size="lg" />} title="Easy Sharing" description="Share collections of links with teammates or make them public." />
                    <Feature icon={<SecureStorage />} title="Secure Storage" description="Your links are encrypted and safely stored in our secure database." />
                    <Feature icon={<CustomCollections />} title="Custom Collections" description="Create beautiful collections to showcase your favorite links." />
                    <Feature icon={<QuickAccess />} title="Quick Access" description="Access your links from any device with our cloud sync feature." />
                    <Feature icon={<BookmarkIcon />} title="Browser Extension" description="Save links directly from your browser with one click." />
                </div>
            </div>
            <div className="h-auto bg-offwhite flex justify-center">
                <div className="w-[95%] rounded-3xl text-white text-4xl flex items-center flex-col font-bold bg-blue-600 h-80 mt-28">
                    <h1 className="mt-16">Start Organizing Your Links Today</h1>
                    <h3 className="font-normal mt-6 text-xl w-[60%] text-center text-gray-100">Join thousands of users who trust LinkVault to manage their important links. Get started for free and upgrade anytime.</h3>
                    <div className="mt-8">
                        <CircularButton variant="secondary" onclick={() => navigate('signup')} text="Create Free Account" size="lg" />
                    </div>
                </div>
            </div>
            <div className="mt-16 bg-slate-900 h-32 flex items-center">
                <div className="flex items-center ml-8 gap-3 text-slate-400">
                    <BookmarkIcon />
                    <h2 className="font-bold text-white text-2xl">LinkVault</h2>
                </div>
            </div>
        </div>
    )
}

export default LandingPage