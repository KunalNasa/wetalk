import { useState } from "react"
import useAuthStore from "../store/useAuthUser";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthStore();

    const logout = async () => {
        setLoading(true);
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (!data.success) {
				throw new Error(data.message);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error : any) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}

    }
    return {loading, logout};
}

export default useLogout
