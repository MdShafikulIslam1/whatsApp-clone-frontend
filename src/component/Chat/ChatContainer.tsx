import { useAppSelector } from "@/redux/hook";
import { calculateTime } from "@/utils/CalculateTime";
import React from "react";
import MessageStatus from "../MessageStatus";

function ChatContainer() {
  const { userInfo, currentChatUserInfo, messages } = useAppSelector(
    (state) => state.user
  );
  console.log("messages: ", messages);

  return (
    <div className="h-[80vh] w-full flex-grow relative overflow-auto custom-scrollbar">
      <div className="fixed z-0 w-full h-full bg-fixed bg-chat-background opacity-5"></div>
      <div className="relative bottom-0 left-0 z-40 mx-10 my-6">
        <div className="flex w-full">
          <div className="flex flex-col justify-start w-full gap-1 overflow-auto">
            {messages?.map((message, index) => {
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
                  {/* {message?.type === "image" && (
                    <ImageMessage message={message} />
                  )} */}
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
