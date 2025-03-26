import MessageContainer from "../../components/MessageContainer/MessageContainer"
import Sidebar from "../../components/Sidebar/Sidebar"

const Home = () => {
  return (
    <div className='flex h-screen rounded-lg overflow-hidden bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
