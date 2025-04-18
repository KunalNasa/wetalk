import jwt from "jsonwebtoken"
import {Request, Response, NextFunction} from "express"
import { ErrorResponse } from "../types/response";
import Status from "../types/statusCodes";
import userModel from "../models/user.model";

// this code is not correct as this is not taking advantage of jwt stateless feature and querying db for each request passed through it.
// FIX: instead of only adding userId in jwt add all essential but not sensitive details like _id, name, email etc.
const protectRoute = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            const response : ErrorResponse = {
                success : false,
                message : "Unauthorised request",
            } 
            return res.status(401).json(response)
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);
        if(!verifyToken){
            const response : ErrorResponse = {
                success : false,
                message : "Verification failed! Unauthorised request"
            }
            return res.status(Status.UNAUTHORIZED).json(response);
        }
        // console.log(verifyToken);
        const user = await userModel.findById((verifyToken as jwt.JwtPayload).userId).select("-password");
        if (!user) {
            const response: ErrorResponse = {
                success: false,
                message: "User not found"
            };
            return res.status(Status.UNAUTHORIZED).json(response);
        }
        req.user = user;
        next();

    } catch (error : any) {
        // console.log(error);
        const response : ErrorResponse = {
            success : false,
            message : error.message 
        }
        return res.status(Status.INTERNAL_SERVER_ERROR).json(response);
        
    }
}

export default protectRoute;