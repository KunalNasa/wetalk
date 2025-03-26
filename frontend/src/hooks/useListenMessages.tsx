import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversationStore from "../store/useConversation";


const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversationStore();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            console.log("New message through socket", newMessage);
            const myMessage = {
                _id : newMessage._id,
                senderId: newMessage.senderId,
                receiverId: newMessage.receiverId,
                message: newMessage.message, 
                createdAt : newMessage.createdAt
            }
            setMessages([...messages, myMessage]);
        })
        return () => {socket?.off("newMessage")};
    }, [messages, setMessages, socket]);
}

export default useListenMessages
