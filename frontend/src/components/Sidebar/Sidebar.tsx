import Conversations from "./Conversations"
import Logout from "./Logout"
import SearchInput from "./SearchInput"

const Sidebar = () => {
  return (
    <div className='border-r bg-gray-800 border-slate-500 p-4 flex flex-col'> 
        <SearchInput/>
		    <div className='divider px-3'></div>
        <Conversations/>
        <Logout/>
    </div>
  )
}

export default Sidebar
