import { create } from "zustand";
import { MessageSchema } from "../types/messages.type";
import { authUserType } from "../types/authUser.type";

interface conversationState {
  messages: MessageSchema[] | []
  setMessages: (messages: MessageSchema[] | []) => void;
  conversation : authUserType | null;
  setConversation : (conversation : authUserType | null) => void
}

const conversationStore = create<conversationState>((set) => ({
    messages : [],
    setMessages : (messages) => set({messages}),
    conversation : null,
    setConversation : (conversation) => set({conversation})

}))

export default conversationStore;