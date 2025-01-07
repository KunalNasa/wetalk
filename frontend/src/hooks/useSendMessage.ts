import { useState } from "react"
import useConversationStore from "../store/useConversation";
import toast from "react-hot-toast";


const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const {selectedConversation, messages, setMessages} = useConversationStore();
    const sendMessage = async (message : string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({message})
            })
            const data = await response.json();
            if(!data.success){
                throw new Error(data.message);
            }
            setMessages([...messages, data.data]);
        } catch (error : any) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading, sendMessage};
}

export default useSendMessage
