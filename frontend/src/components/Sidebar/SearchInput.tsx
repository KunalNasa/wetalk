import { useState } from "react"
import useGetConversations from "../../hooks/useGetConversations";
import useConversationStore from "../../store/useConversation";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";


const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const {conversations} = useGetConversations();
  const { setSelectedConversation} = useConversationStore();

  const handleSubmit = (e :  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!search) return;
    const conversation = conversations.find((c) => (c.fullName.toLowerCase().includes(search.toLowerCase())));
    
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    }else{
      toast.error("No such user found!")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input 
        type="text"
        value={search}
        className='input input-bordered rounded-full'
        onChange={(e) => {setSearch(e.target.value)}} /> 
        <button type='submit' className='btn btn-circle bg-green-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
      </form>
    </div>
  )
}

export default SearchInput
