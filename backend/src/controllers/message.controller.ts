import {Request, Response} from "express"
import { ApiResponse, ErrorResponse } from "../types/response";
import Status from "../types/statusCodes";
import MessageModel from "../models/message.model";
import conversationModel from "../models/conversation.model";
import { getSocketIdCorrespondingToUserId, io } from "../socket/socket";
import { MessageSchema } from "../types/schemas";
import mongoose from "mongoose";


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
                message : "Failed to send m",
                data : message
            }
            return res.status(Status.INTERNAL_SERVER_ERROR).json(response);
        }
        let conversation = await conversationModel.findOne({
            participants : {$all : [senderId, receiverId]}
        });

        if(!conversation){
            conversation = await conversationModel.create({
                participants : [senderId, receiverId]
            })
        }
        conversation.messages?.push(new mongoose.Schema.Types.ObjectId(sendMessage._id));
        await conversation.save();
        const receiverSocketId = getSocketIdCorrespondingToUserId(receiverId);
        if(receiverSocketId !== ""){
            io.to(receiverSocketId).emit("newMessage", {message : sendMessage});
        }
        const response : ApiResponse<MessageSchema> = {
            success : true,
            message : "Message sent successfully",
            data : sendMessage
        }
        return res.status(Status.CREATED).json(response);
    } catch (error : any) {
        const response : ErrorResponse = {
            success : false,
            message : error.message
        };
        return res.status(Status.INTERNAL_SERVER_ERROR).json(response);
    }
}

export const getMessages = async (req : Request, res : Response) : Promise<any> =>{
    const receiverId = req.params.id;
    const senderId = req.user?._id;
    if(!senderId || !receiverId){
        const response: ApiResponse<null> = {
            success : false,
            message : "Invalid Request"
        }
        return res.status(Status.BAD_REQUEST).json(response);
    }
    try {
        const conversation = await conversationModel.findOne({
            participants : { $all : [senderId, receiverId] }
        }).populate<{ messages: MessageSchema[] }>("messages");

        if(!conversation){
            const response : ErrorResponse = {
                success : false,
                message : "Conversation Not Found"
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
