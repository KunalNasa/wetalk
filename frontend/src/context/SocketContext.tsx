/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"
import useAuthStore from "../store/useAuthUser";
import { authUserType } from "../types/authUser.type";

export const SocketContext = createContext<{ socket: Socket | null, onlineUsers: any[] }>({ socket: null, onlineUsers: [] });

export const useSocketContext = () => {
    return useContext(SocketContext);
};


export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { authUser } = useAuthStore();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<authUserType[] | []>([]);

    useEffect(() => {
        if (authUser) {
            const socketConnection = io("http://localhost:8000", {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socketConnection);
            socket?.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })
            return () => {
                socket?.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])
    return <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>
}
