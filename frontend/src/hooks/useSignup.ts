import { useState } from "react"
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthUser";

type inputData = {
    fullName : string,
    userName : string,
    emailId : string,
    password : string,
    confirmPassword : string,
    gender : string
}
const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {setAuthUser} = useAuthStore();
    const signup = async (inputData : inputData) => {
        const success = handleInputErrors(inputData);
        setLoading(true);
        try {
            const {fullName, userName, emailId, password, confirmPassword, gender} = inputData;
            const response = await fetch("/api/auth/signup", {
                method : "POST",
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify({fullName, userName, emailId, password, confirmPassword, gender})
            })
            const data = await response.json();
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
    return {signup, loading};
}

export default useSignup

function handleInputErrors(inputData : inputData) {
    const {fullName, userName, password, confirmPassword, gender}
    = inputData;
	if (!fullName || !userName || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}