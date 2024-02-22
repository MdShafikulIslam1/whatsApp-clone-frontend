
import { useAppSelector } from "@/redux/hook";
import { calculateTime } from "@/utils/CalculateTime";
import Image from "next/image";
import React from "react";
import MessageStatus from "./MessageStatus";

function ImageMessage({ message }:any) {
const {userInfo,currentChatUserInfo} = useAppSelector(state => state.user)
  return (
    <div
      className={`p-1 rounded-lg ${
        message?.senderId === currentChatUserInfo?.id
          ? " bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div className="relative">
        <Image
          src={message?.message}
          alt="chat-image"
          height={300}
          width={300}
          className="rounded-lg"
        />
        <div className="absolute bottom-0 right-0 flex justify-end gap-1">
          <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
            {calculateTime(message?.createdAt)}
          </span>
          <span>
            {message?.senderId === userInfo?.id && (
              <MessageStatus messageStatus={message?.messageStatus} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageMessage;
