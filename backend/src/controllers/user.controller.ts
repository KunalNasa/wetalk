import { Request, Response } from "express";
import { ApiResponse, ErrorResponse, SuccessResponse } from "../types/response";
import Status from "../types/statusCodes";
import userModel from "../models/user.model";
import { requestUser } from "../types/req";

export const getUsersForSidebar = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.user) {
            return res.status(Status.BAD_REQUEST).json({
                success: false,
                message: "User not authenticated.",
            });
        }

        const userId = req.user?._id;
        console.log("Authenticated User ID:", userId);

        const allUsers = await userModel.find({
            _id: { $ne: userId },
        }).select("-password");

        if (allUsers.length !== 0) {
            const response: SuccessResponse<requestUser[]> = {
                success: true,
                message: "Fetched All Users Successfully",
                data: allUsers,
            };
            return res.status(Status.OK).json(response);
        } else {
            const response: ApiResponse<[]> = {
                success: true,
                message: "No users available",
                data: [],
            };
            return res.status(Status.NO_CONTENT).json(response);
        }
    } catch (error: any) {
        console.error("Error in getUsersForSidebar:", error);

        const errorResponse: ErrorResponse = {
            success: false,
            message: error.message,
        };
        return res.status(Status.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};
