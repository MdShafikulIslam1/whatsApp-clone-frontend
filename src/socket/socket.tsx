/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useAppSelector } from "@/redux/hook";
import { getUserInfo } from "@/service/authentication.service";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const userInfo: any = getUserInfo();

  useEffect(() => {
    const connectSocket = () => {
      if (userInfo) {
        const newSocket: Socket = io("https://whats-app-server.vercel.app", {
          query: {
            userId: userInfo?.id,
          },
        });

        setSocket(newSocket);

        // Listen to events
        newSocket.on("getOnlineUsers", (users: Array<string>) => {
          setOnlineUsers(users);
        });

        // Handle disconnection
        return () => {
          newSocket.close();
          setSocket(null);
        };
      }
    };

    connectSocket();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
