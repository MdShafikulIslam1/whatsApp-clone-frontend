/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ChatList from "./ChatList/ChatList";
import Empty from "./Empty";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Chat from "./Chat/Chat";
import { useGetAllMessageQuery } from "@/redux/api/messageApi";
import SearchMessages from "./Chat/SearchMessages";
import { getUserInfo } from "@/service/authentication.service";
import { useSocketContext } from "@/socket/socket";

const Main = () => {
  const { currentChatUserInfo, messageSearch } = useAppSelector(
    (state) => state.user
  );
  return (
    <>
      <div className="grid w-screen h-screen max-w-full max-h-screen overflow-hidden grid-cols-1 md:grid-cols-main">
        <ChatList />
        <div>
          {currentChatUserInfo ? (
            <div className={messageSearch ? "grid grid-cols-2" : "grid-cols-2"}>
              <Chat />
              {messageSearch && <SearchMessages />}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
