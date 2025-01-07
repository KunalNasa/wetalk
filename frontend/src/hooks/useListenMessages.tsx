import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversationStore from "../store/useConversation";


const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversationStore();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        })
        return () => {socket?.off("newMessage")};
    }, [messages, setMessages, socket]);
}

export default useListenMessages
