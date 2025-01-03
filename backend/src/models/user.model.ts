import mongoose, {Schema} from "mongoose"
import { UserSchema } from "../types/schemas";

const UserSchema : Schema<UserSchema> = new mongoose.Schema({
    fullName : {
        type : String,
        required : [true, "Please provide your fullName"]
    },
    userName : {
        type : String,
        required : [true, "Please provide username"],
        unique : [true, "This username is already taken"]
    },
    emailId : {
        type : String,
        required : [true, "Please Provide email ID"],
        unique : [true, "Email already exists"]
    },
    password : {
        type : String, 
        required : [true, "Please Provide password"]
    },
    gender : {
        type : String,
        required : [true, "Please specify your gender"],
        enum : ["Male", "Female", "Others"]
    },
    profilePic : {
        type : String,
    }
} , {timestamps : true});

const userModel = mongoose.model("User", UserSchema);
export default userModel;