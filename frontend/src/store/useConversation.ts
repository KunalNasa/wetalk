import { create } from "zustand";
import { MessageSchema } from "../types/messages.type";
import { authUserType } from "../types/authUser.type";

interface conversationState {
  messages: MessageSchema[] | []
  setMessages: (messages: MessageSchema[] | []) => void;
  selectedConversation : authUserType | null;
  setSelectedConversation : (conversation : authUserType | null) => void
}

const useConversationStore = create<conversationState>((set) => ({
    messages : [],
    setMessages : (messages) => set({messages : messages ?? []}),
    selectedConversation : null,
    setSelectedConversation : (selectedConversation) => set({selectedConversation})

}))

export default useConversationStore;