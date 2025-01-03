import { Server } from "socket.io"
import express from "express"
import http from "http"

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods : ["GET", "POST"]
    }
});

const userIdToSocketIdMap: Map<string, string> = new Map();

export const getSocketIdCorrespondingToUserId = (userId: string): string => {
    return userIdToSocketIdMap.get(userId) || "";
}

io.on("connect", (socket) => {
    console.log("User connected with socket id : ", socket.id);
    const userId : string = socket.handshake.query.userId as string;
    if(userId){
        userIdToSocketIdMap.set(userId, socket.id);
    }
    io.emit("getOnlineUsers", Object.keys(userIdToSocketIdMap));

    socket.on("disconnect", () => {
        userIdToSocketIdMap.delete(userId);
        io.emit("getOnlineUsers", Object.keys(userIdToSocketIdMap));
    })
})

export {io, app, httpServer};