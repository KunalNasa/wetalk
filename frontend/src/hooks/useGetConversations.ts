import { useEffect, useState } from "react"
import { authUserType } from "../types/authUser.type";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<authUserType[] | []>([]);
    useEffect(() => {
        const getConversations = async () =>{
            setLoading(true);
            try {
                console.log("Start request");
                const response = await fetch("/api/users");
                console.log(response);
                const data = await response.json();
                console.log(data);
                if(!data.success){
                    throw new Error(data.message);
                }
                console.log(data.data)
                setConversations(data.data);
            } catch (error : any) {
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        getConversations();
    }, [])
    
    return {loading, conversations};
}

export default useGetConversations
