import {Request, Response} from "express"
import { ApiResponse, ErrorResponse } from "../types/response";
import Status from "../types/statusCodes";
import MessageModel from "../models/message.model";
import conversationModel from "../models/conversation.model";
import { getSocketIdCorrespondingToUserId, io } from "../socket/socket";
import { MessageSchema } from "../types/schemas";


export const sendMessage = async (req : Request, res : Response) : Promise<any> =>{
    const senderId = req.user?._id;
    const receiverId = req.params.id; // or const {id} = req.params;
    const { message } = req.body; // or const message = req.body.message;
    if(!senderId || !receiverId || !message){
        const response: ErrorResponse = {
            success : false,
            message : "Invalid Request"
        }
        return res.status(Status.BAD_REQUEST).json(response);
    }
    try {
        const sendMessage = await MessageModel.create({
            receiverId,
            senderId,
            message
        })
        if(!sendMessage){
            const response : ApiResponse<string> = {
                success: false,
                message : "Failed to send message",
                data : message
            }
            return res.status(Status.INTERNAL_SERVER_ERROR).json(response);
        }
        let conversation = await conversationModel.findOne({
            participants : {$all : [senderId, receiverId]}
        });
        // console.log("conversation : ", conversation);
        if(!conversation){
            conversation = await conversationModel.create({
                participants : [senderId, receiverId]
            })
        }
        // console.log("Hey");
        // console.log(typeof sendMessage._id);
        conversation.messages?.push(sendMessage._id);
        // console.log("Hello");
        await conversation.save();
        const receiverSocketId = getSocketIdCorrespondingToUserId(receiverId);
        if(receiverSocketId !== ""){
            console.log("New Message", sendMessage);
            io.to(receiverSocketId).emit("newMessage", sendMessage);
        }
        const response : ApiResponse<MessageSchema> = {
            success : true,
            message : "Message sent successfully",
            data : sendMessage
        }
        return res.status(Status.CREATED).json(response);
    } catch (error : any) {
        console.log(error);
        const response : ErrorResponse = {
            success : false,
            message : error.message
        };
        return res.status(Status.INTERNAL_SERVER_ERROR).json(response);
    }
}

export const getMessages = async (req : Request, res : Response) : Promise<any> =>{
    const receiverId = req.params.id.toString();
    const senderId = req.user?._id.toString();
    if(!senderId || !receiverId){
        const response: ApiResponse<null> = {
            success : false,
            message : "Invalid Request"
        }
        return res.status(Status.BAD_REQUEST).json(response);
    }
    try {
        // console.log(senderId, " ", receiverId);
        const conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate<{ messages: MessageSchema[] }>({
            path: "messages",
            select: ["_id", "senderId", "receiverId", "message", "createdAt"]
        }).lean();

        console.log("My Conversations", conversation);

        if(!conversation){
            const response : ApiResponse<[]> = {
                success : true,
                message : "Conversation Not Found",
                data : []
            };
            return res.status(Status.BAD_REQUEST).json(response);
        }
        const messages = conversation.messages;
        if(messages){
            const response : ApiResponse<MessageSchema[]> = {
                success : true,
                message : "Messages Fetched successfully",
                data : messages
            }
            return res.status(Status.OK).json(response);
        }
        return res.status(Status.OK).json()
    } catch (error : any) {
        const response : ApiResponse<null> = {
            success : false,
            message : error.message
        };
        return res.status(Status.INTERNAL_SERVER_ERROR).json(response);
    }
}
