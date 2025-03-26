import { useEffect, useState } from "react"
import useConversationStore from "../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {messages, setMessages, selectedConversation} = useConversationStore();
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/messages/${selectedConversation?._id}`);
                const data = await response.json();
                if(!data.success){
                    throw new Error(data.message);
                }
                // console.log("Setting messages as", data.data);
                setMessages(data.data);
            } catch (error : any) {
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        getMessages();
    }, [setMessages, selectedConversation?._id])
    

    return {loading, messages};
}

export default useGetMessages
