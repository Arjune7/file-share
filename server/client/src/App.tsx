import DropBox from "./Components/DropBox"
import axios from 'axios'
import { Routes, Route, Path } from 'react-router-dom'
import Download from "./Components/Download"

axios.defaults.baseURL = 'http://localhost:3000/'

function App() {
  return (
    <div className="h-screen font-serif bg-gray-900 text-white grid place-items-center">
      <Routes>
        <Route path="/" element={<DropBox/>}/>
        <Route path="/download/:id" element={<Download />} />
      </Routes>
    </div>
  )
}

export default App
