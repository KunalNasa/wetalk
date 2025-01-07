import useAuthStore from "../../store/useAuthUser"
import useConversationStore from "../../store/useConversation"
import { MessageSchema } from "../../types/messages.type"
import { extractTime } from "../../utils/formatTime"

type props = {
    message : MessageSchema
}
const Message = (props : props) => {
    const {message} = props;
    const {authUser} = useAuthStore();
    const {selectedConversation} = useConversationStore();
    const fromMe = message.senderId === authUser?._id;
	const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end": "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} break-all pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
}

export default Message
