import React from "react";
import Avatar from "../Avatar";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppSelector } from "@/redux/hook";

const ChatHeader = () => {
  const currentChatUserInfo = useAppSelector(
    (state) => state.user.currentChatUserInfo
  );
  return (
    <div className="z-10 flex items-center justify-between h-16 px-4 py-3 bg-panel-header-background">
      <div className="flex items-center justify-center gap-6">
        <Avatar type={"sm"} image={currentChatUserInfo?.profilePhoto} />
        <div className="flex flex-col">
          <span className="text-primary-strong">
            {currentChatUserInfo?.name}
          </span>
          <span className="text-sm text-secondary">offline/online</span>
        </div>
      </div>
      <div className="flex gap-6">
        <BiSearchAlt2 className="text-xl cursor-pointer text-panel-header-icon" />
        <BsThreeDotsVertical
          className="text-xl cursor-pointer text-panel-header-icon"
          id="context-opener"
        />
      </div>
    </div>
  );
};

export default ChatHeader;
