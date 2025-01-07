import { useState } from "react"
import useAuthStore from "../store/useAuthUser";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {setAuthUser} = useAuthStore();
    const login = async (identifier : string, password : string) => {
        setLoading(true);
        try {
            const resonse = await fetch("/api/auth/login", {
                method : "POST",
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify({identifier, password})
            })
            const data = await resonse.json();
            if(!data.success){
                throw new Error(data.message);
            }
            localStorage.setItem("chat-user", data.data);
            setAuthUser(data.data);
        } catch (error : any) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    return {loading,login};
}

export default useLogin
