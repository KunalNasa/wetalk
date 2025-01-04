import jwt from "jsonwebtoken"
import { Response } from "express"

export async function generateTokenAndSetCookie(res : Response, userId : string) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET as string, {
        expiresIn : "15d"
    });
    if(token){
        res.cookie("jwt", {
            maxAge: 15 * 24 * 60 * 60 * 1000, // MS
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development",
        })
    }
}