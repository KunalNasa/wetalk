import { ConversationSchema } from "../types/schemas";
import mongoose, { Schema } from "mongoose"
const conversationSchema : Schema<ConversationSchema> = new mongoose.Schema({
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Message"
        }
    ]
})

const conversationModel = mongoose.model("Conversation", conversationSchema);
export default conversationModel;