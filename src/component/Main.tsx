"use client";
import { onAuthStateChanged } from "firebase/auth";
import ChatList from "./ChatList/ChatList";
import Empty from "./Empty";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCheckUserMutation } from "@/redux/api/authApi";
import {
  setMessage,
  setSocket,
  setSocketMessage,
  setUserInfo,
} from "@/redux/feature/user/userSlice";
import Chat from "./Chat/Chat";
import { useGetAllMessageQuery } from "@/redux/api/messageApi";
import { Socket, io } from "socket.io-client";

const Main = () => {
  const router = useRouter();
  const socket = useRef<Socket | null>(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [socketEvent, setSocketEvent] = useState(false);
  const { userInfo, currentChatUserInfo } = useAppSelector(
    (state: any) => state.user
  );
  const dispatch = useAppDispatch();

  const [checkUser] = useCheckUserMutation();
  const { data } = useGetAllMessageQuery({
    from: userInfo?.id,
    to: currentChatUserInfo?.id,
  });

  if ((data as any)?.success) {
    dispatch(setMessage((data as any)?.data));
  }

  useEffect(() => {
    if (redirectToLogin) router.push("/login");
  }, [redirectToLogin, router]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (!currentUser) setRedirectToLogin(true);

      try {
        if (currentUser?.email && !userInfo) {
          const data: any = await checkUser({
            email: currentUser?.email,
          }).unwrap();

          if (data?.success) {
            const { id, name, about, email, profilePhoto } = data?.data!;
            dispatch(setUserInfo({ id, name, about, email, profilePhoto }));
          }
        }
      } catch (error: any) {
        if (!error?.response?.data?.success) {
          setRedirectToLogin(true);
        }
      }
    });
  }, [checkUser, userInfo, dispatch]);

  useEffect(() => {
    if (userInfo && !socket.current) {
      const newSocket = io("http://localhost:5000");
      newSocket.emit("add-user", userInfo.id);
      dispatch(setSocket(newSocket));
      socket.current = newSocket;
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("received-message", (data: any) => {
        console.log("the data comes from the socket", data);
        // Dispatch action to handle received message
      });
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-main w-screen h-screen max-h-screen overflow-hidden">
        <ChatList />
        {currentChatUserInfo?.id ? <Chat /> : <Empty />}
      </div>
    </>
  );
};

export default Main;
