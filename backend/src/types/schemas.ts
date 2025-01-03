import mongoose, {Document} from "mongoose"
export interface UserSchema extends Document{
    _id : string,
    fullName : string,
    userName : string,
    emailId : string,
    password : string,
    gender : string,
    profilePic : string,
}
export interface MessageSchema extends Document{
    _id : string,
    senderId: mongoose.Schema.Types.ObjectId;
    receiverId: mongoose.Schema.Types.ObjectId;
    message: string; 
}
export interface ConversationSchema extends Document {
    _id : string,
    participants: mongoose.Schema.Types.ObjectId[]; // Array of ObjectIds
    messages?: mongoose.Schema.Types.ObjectId[]; // Array of ObjectIds
}