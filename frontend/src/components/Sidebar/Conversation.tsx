import { useSocketContext } from "../../context/SocketContext"
import useConversationStore from "../../store/useConversation"
import { authUserType } from "../../types/authUser.type"

type props = {
    conversation : authUserType,
    lastIdx : boolean,
}
const Conversation = (props : props) => {
    const {conversation, lastIdx} = props;

    const {selectedConversation, setSelectedConversation} = useConversationStore(); 
    const {onlineUsers} = useSocketContext();
    const isSelected = selectedConversation?._id === conversation._id;
    console.log(onlineUsers);
    const isOnline = onlineUsers.includes(selectedConversation?._id);
    return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.userName}</p>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
}

export default Conversation
