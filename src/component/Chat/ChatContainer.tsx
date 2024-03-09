/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { calculateTime } from "@/utils/CalculateTime";
import { useGetAllMessageQuery } from "@/redux/api/messageApi";
import { getUserInfo } from "@/service/authentication.service";
import { useSocketContext } from "@/socket/socket";
import MessageStatus from "../MessageStatus";
import ImageMessage from "../ImageMessage";
import { IMessage, setMessage } from "@/redux/feature/user/userSlice";

function ChatContainer() {
  const { currentChatUserInfo, messages } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const { socket } = useSocketContext();
  const userInfo: any = getUserInfo();
  const { data, isSuccess } = useGetAllMessageQuery({
    from: userInfo?.id,
    to: currentChatUserInfo?.id,
  });

  useEffect(() => {
    if (isSuccess && (data as any)?.data?.length > 0) {
      setAllMessages((data as any)?.data);
      dispatch(setMessage((data as any)?.data as []));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    socket?.on("new_message", (new_message) => {
      setAllMessages([...allMessages, new_message]);
    });

    return () => {
      socket?.off("new_message");
    };
  }, [socket, allMessages]);

  let uniqueMessages = Array.from(
    new Set(allMessages.map((message: any) => message.id))
  ).map((id) => {
    return allMessages.find((message: any) => message.id === id);
  });

  return (
    <div className="h-[80vh] w-full flex-grow relative overflow-auto custom-scrollbar">
      <div className="fixed z-0 w-full h-full bg-fixed bg-chat-background opacity-5"></div>
      <div className="relative bottom-0 left-0 z-40 mx-10 my-6">
        <div className="flex w-full">
          <div className="flex flex-col justify-start w-full gap-1 overflow-auto">
            {uniqueMessages?.map((message: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex ${
                    message?.senderId === currentChatUserInfo?.id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {message?.type === "text" && (
                    <div
                      className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                        message?.senderId === currentChatUserInfo?.id
                          ? "bg-incoming-background"
                          : "bg-outgoing-background"
                      }`}
                    >
                      <span className="text-white break-all">
                        {message?.message}
                      </span>
                      <div className="flex items-end gap-1">
                        <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                          {calculateTime(message?.createdAt)}
                        </span>
                        <span>
                          {message?.senderId === userInfo?.id && (
                            <MessageStatus
                              messageStatus={message?.messageStatus}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  {message?.type === "image" && (
                    <ImageMessage message={message} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
