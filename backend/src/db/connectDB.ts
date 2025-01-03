import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(connection.connection.name, "DB connected successfully", );
    } catch (error : any) {
        if (error.name === 'MongoNetworkError') {
        console.log("Network issue while connecting to the database", error.message);
    } else {
        console.log("Failed to connect to Database", error.message);
    }
    }
}

export default connectDB;