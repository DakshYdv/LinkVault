import Dashboard from "./components/Dashboard"
import DocumentsDashboard from "./components/DocumentsDashboard"
import LandingPage from "./components/LandingPage"
import LinksDashboard from "./components/LinksDashboard"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import TweetsDashboard from "./components/TweetsDashboard"
import VideosDashboard from "./components/VideosDashoard"
import "./index.css"
import { Route, Routes, BrowserRouter } from "react-router-dom"

const App = () => {
  return <div>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/tweets" element={<TweetsDashboard />} />
        <Route path="/dashboard/videos" element={<VideosDashboard />} />
        <Route path="/dashboard/documents" element={<DocumentsDashboard />} />
        <Route path="/dashboard/links" element={<LinksDashboard />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App