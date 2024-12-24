import { useRef } from "react"
import BookmarkIcon from "../icons/BookmarkIcon"
import Lock from "../icons/Lock"
import Mail from "../icons/Mail"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AxiosResponse } from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SignIn = () => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const HandleSignIn = async () => {
        try {
            const username = usernameRef.current?.value
            const password = passwordRef.current?.value

            const response: AxiosResponse = await axios.post(`${BACKEND_URL}/signin`, {
                username,
                password
            })
            await localStorage.setItem('authorization', response.data.token)
            if (response.status === 200) {
                navigate("/dashboard")
            }
        } catch (error) {
            alert('there was an error signing in')
            console.log(`error in signing in: ${error}`);
        }
    }

    return (
        <div className="h-screen w-screen bg-offwhite flex flex-col items-center">
            <div className="flex gap-2 mt-20">
                {<BookmarkIcon />}
                <h1 className="font-bold text-3xl">LinkVault</h1>
            </div>
            <div className="flex justify-center text-center text-4xl font-extrabold mt-6">
                <h1>Welcome Back</h1>
            </div>
            <div>
                <h3 className="text-gray-700 text-lg mt-3">Don't have an account. <span onClick={() => navigate('/signup')} className="text-blue-600 hover:cursor-pointer">Sign up for free</span></h3>
            </div>
            <div className="w-[600px] h-[300px] rounded-xl mt-5 flex justify-center items-center bg-ivory ">
                <div className="w-[80%] h-[90%]">
                    <div>
                        <h4 className="text-lg">Username</h4>
                        <div className="w-full rounded-md h-12 bg-white flex focus-within:border-blue-500 focus-within:border-2">
                            <div className="w-[10%] flex justify-center items-center"><Mail /></div>
                            <input type="text" ref={usernameRef} className="w-[90%] focus:outline-none text-xl" placeholder="Enter your username" />
                        </div>
                    </div>
                    <div className="pt-5">
                        <h4 className="text-lg">Password</h4>
                        <div className="w-full rounded-md h-12 bg-white flex focus-within:border-blue-500 focus-within:border-2">
                            <div className="w-[10%] flex justify-center items-center"><Lock /></div>
                            <input type="text" ref={passwordRef} className="w-[90%] focus:outline-none text-xl" placeholder="Enter your password" />
                        </div>
                    </div>
                    <button className="w-full h-12 bg-blue-600 hover:bg-blue-800 mt-8 rounded-lg text-gray-200" onClick={HandleSignIn}>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn