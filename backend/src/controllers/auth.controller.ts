import {Request, Response} from "express"
import { ErrorResponse, ApiResponse, SuccessResponse } from "../types/response";
import Status from "../types/statusCodes";
import userModel from "../models/user.model";
import bcrypt from "bcrypt"
import { generateTokenAndSetCookie } from "../utils/generateToken";
import { requestUser } from "../types/req";

export const signup = async (req : Request, res : Response) : Promise<any> =>{
    try {
        const {fullName, userName, emailId, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword){
            const error : ErrorResponse = {
                success : false,
                message : "password didn't match with confirm password field",
            }
            return res.status(Status.BAD_REQUEST).json(error);
        }
        const existingEmail = await userModel.findOne({
            emailId
        });
        if(existingEmail){
            const response : ApiResponse<string> = {
                success : false,
                message : "This email is already in use",
                data : emailId
            }
            return res.status(Status.BAD_REQUEST).json(response);
        }
        const existingUsername = await userModel.findOne({
            userName
        });
        if(existingUsername){
            const response : ApiResponse<string> = {
                success : false,
                message : "Username is already taken",
                data : userName
            }
            return res.status(Status.BAD_REQUEST).json(response);
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = await userModel.create({
            userName,
            fullName,
            emailId,
            password : hashedPassword,
            gender,
            profilePic : gender === "Male" ? boyProfilePic : girlProfilePic
        })
        if(newUser){
            const userData : requestUser = {
                _id : newUser._id,
                userName : newUser.userName,
                fullName : newUser.fullName,
                emailId : newUser.emailId,
                gender : newUser.gender,
                profilePic : newUser.profilePic
            }
            const successResponse : SuccessResponse<requestUser> = {
                success : true,
                message : "Account created successfully",
                data : userData
            }
            return res.status(Status.CREATED).json(successResponse);
        }

        
    } catch (error : any) {
        const errorResponse : ErrorResponse = {
            success : false,
            message : error.message   
        }
        return res.status(Status.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

}

export const login = async (req : Request, res : Response) : Promise<any> =>{
    try {
        const {emailId, userName, password} = req.body;
        const user = await userModel.findOne({
            $or : [
                {emailId : emailId},
                {userName : userName}
            ]
        }).select("-password");
        if(!user){
            const response : ErrorResponse = {
                success : false,
                message : "No account exist with this username/Email"
            }
            return res.status(Status.BAD_REQUEST).json(response);
        }
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect){
            const response : ErrorResponse = {
                success : false,
                message : "Invalid credentials"
            }
            return res.status(Status.BAD_REQUEST).json(response);
        }

        generateTokenAndSetCookie(res, user._id);
        const returnResponse : ApiResponse<requestUser> = {
            success : true,
            message : "Login Successful",
            data : user
        }
        return res.status(Status.OK).json(returnResponse);

    } catch (error : any) {
        const errorResponse : ErrorResponse = {
            success: false,
            message : error.message
        }
		res.status(Status.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

export const logout = async (req : Request, res : Response) : Promise<any> =>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error : any) {
        const errorResponse : ErrorResponse = {
            success :false,
            message : error.message
        }
		res.status(Status.INTERNAL_SERVER_ERROR).json(errorResponse);
	}
}