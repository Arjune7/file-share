import DropBox from "./Components/DropBox"
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'

function App() {
  return (
    <div className="h-screen font-serif bg-gray-900 text-white grid place-items-center">
      <DropBox />
    </div>
  )
}

export default App
