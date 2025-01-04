// backend/src/types/req.d.ts
import { UserSchema } from "./schemas";
export interface requestUser{
  _id : string,
  userName : string,
  fullName : string,
  gender : string,
  emailId : string,
  profilePic : string
}

declare global {
  namespace Express {
    interface Request {
      user?: requestUser; // The user property, which will be set by middleware
    }
  }
}

export {}; // Ensure this file is treated as a module
