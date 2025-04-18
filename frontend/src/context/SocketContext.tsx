/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"
import useAuthStore from "../store/useAuthUser";

export const SocketContext = createContext<{ socket: Socket | null, onlineUsers: string[] }>({ socket: null, onlineUsers: [] });

export const useSocketContext = () => {
    return useContext(SocketContext);
};


export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { authUser } = useAuthStore();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        if (authUser) {
            const socketConnection = io("http://localhost:8080", {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socketConnection);
            socketConnection?.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })
            return () => {
                socketConnection?.close();
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
