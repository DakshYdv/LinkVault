
import { useEffect, useState } from "react"
import PlusIcon from "../icons/PlusIcon"
import ShareIcon from "../icons/ShareIcon"
import Button from "./Button"
import Card from "./Card"
import Sidebar from "./Sidebar"
import CircularButton from "./CircularButton"
import { AxiosResponse } from "axios"
import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

interface ContentItem {
  title: string,
  type: "youtube" | "twitter" | "documents" | "links",
  link: string
}

const LinksDashboard = () => {
  const [addContentView, setAddContentView] = useState(false)
  const [content, setContent] = useState([])
  const authorization = localStorage.getItem('authorization')
  console.log(`authorization: ${authorization}`);
  const addContent = () => {
    setAddContentView(true)
  }
  const removeAddContentView = () => {
    setAddContentView(false)
  }
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response: AxiosResponse = await axios.get(`${BACKEND_URL}/dashboard`, {
          headers: {
            authorization
          }
        })
        const data = response.data.content
        setContent(data)
      } catch (err) {
        console.log(`error: ${err}`);
      }
    };
    fetchContent();
  }, []);
  
  return <div className="relative flex z-0">
      <Sidebar />
      <div className="w-[80%] mt-0">
        <div className=" w-full pt-2 pb-2 border-b-2">
          <div className="flex gap-2 justify-end mr-4 ">
            <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} onclick={addContent} />
            <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon size="md" />} />
          </div>       
        </div>
        <div className="w-full mt-0">
          <div className="ml-4 mt-4 columns-3xs gap-2">
            {/* content */}
          {content.filter((item: ContentItem) => item.type === 'links')
          .map((item: ContentItem) => (
            <Card title={item.title} type={item.type} link={item.link} />
          ))}
          </div>
        </div>
      </div>
      {addContentView === true && <div>  {/* add content view */}
        <div className="h-screen w-screen bg-black opacity-30  z-10 top-0 left-0 fixed flex justify-center items-center">
      </div>
      <div className="w-screen h-screen fixed top-0 left-0 opacity-100 z-20 flex justify-center items-center">
        <div className="h-max w-96 flex items-center flex-col bg-white rounded-3xl opacity-100 z-20">
          <div className="text-2xl w-full mt-4 flex justify-center"> {/* input title */}
            {/* <h3>Title</h3> */}
            <div className="w-[90%] rounded-md h-12 bg-white flex focus-within:border-blue-500 focus-within:border-2 justify-center">
                  <input type="text"  className="w-full border-2 border-slate-500 rounded-md focus:outline-none text-xl" placeholder="Enter your Title" />
            </div>
          </div>
          <div className="text-2xl w-full mt-4 flex justify-center">  {/* input link */}
            {/* <h3>Title</h3> */}
            <div className="w-[90%] rounded-md h-12 bg-white flex focus-within:border-blue-500 focus-within:border-2 ">
                  <input type="text"  className="w-full border-2 border-slate-500 rounded-md focus:outline-none text-xl" placeholder="Enter your Link" />
            </div>
          </div>
          <div className="mt-4 w-full flex justify-center text-xl text-gray-500">
          <select className="w-[90%] focus-within:border-blue-500 focus-within:border-2 h-12 border-2 border-gray-500 rounded-md">
            <option value="youtube">youtube</option>
            <option value="youtube">twitter</option>
            <option value="youtube">documents</option>
            <option value="youtube">links</option>
          </select>
          </div>
          <div className="mt-4 w-full flex justify-center text-xl text-gray-500 pb-4">
            <CircularButton variant="primary" text="Add Content" size="md" onclick={removeAddContentView} />
          </div>
        </div>
      </div>
      </div>}
    </div>
}

export default LinksDashboard