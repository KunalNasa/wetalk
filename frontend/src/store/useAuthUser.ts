import { create } from "zustand";
import { authUserType } from "../types/authUser.type";

// Define the shape of the auth state
interface AuthState {
  authUser: authUserType | null// Replace with your actual user type
  setAuthUser: (user: authUserType| null) => void;
}

// Zustand store for auth state
const useAuthStore = create<AuthState>((set) => ({
  authUser: JSON.parse(localStorage.getItem("chat-user") || "null"), // Initialize from localStorage
  setAuthUser: (user) => {
    if (user) {
      localStorage.setItem("chat-user", JSON.stringify(user)); // Save to localStorage
    } else {
      localStorage.removeItem("chat-user"); // Remove from localStorage if null
    }
    set({ authUser: user }); // Update the Zustand state
  },
}));

export default useAuthStore;
