import jwt from "jsonwebtoken"
import {Request, Response, NextFunction} from "express"
import { ApiResponse, ErrorResponse } from "../types/response";
import Status from "../types/statusCodes";
import userModel from "../models/user.model";
const protectRoute = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            const response : ApiResponse<null> = {
                success : false,
                message : "Unauthorised request",
            } 
            return res.status(401).json(response)
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);
        if(!verifyToken){
            const response : ApiResponse<null> = {
                success : false,
                message : "Verification failed! Unauthorised request"
            }
            return res.status(Status.UNAUTHORIZED).json(response);
        }
        const user = await userModel.findById((verifyToken as jwt.JwtPayload).userId).select("-password");
        if (!user) {
            const response: ApiResponse<null> = {
                success: false,
                message: "User not found"
            };
            return res.status(Status.UNAUTHORIZED).json(response);
        }
        req.user = user;

    } catch (error : any) {
        const response : ErrorResponse = {
            success : false,
            message : error.message 
        }
        return res.status(Status.INTERNAL_SERVER_ERROR).json(response);
        
    }
}

export default protectRoute;