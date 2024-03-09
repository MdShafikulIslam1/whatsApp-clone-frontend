"use client";
import React, { useState } from "react";
import Avatar from "../Avatar";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setExitChat, setMessageSearch } from "@/redux/feature/user/userSlice";
import ContextMenu from "../ContextMenu";
import { useSocketContext } from "@/socket/socket";
import { getUserInfo } from "@/service/authentication.service";

const ChatHeader = () => {
  const currentChatUserInfo = useAppSelector(
    (state) => state.user.currentChatUserInfo
  );
  const { onlineUsers } = useSocketContext();
  const dispatch = useAppDispatch();

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const showContextMenu = (e: any) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContextMenuCoordinates({ x: e.pageX - 50, y: e.pageY + 25 });
  };

  const contextMenuOptions = [
    {
      name: "Exist",
      callback: () => {
        dispatch(setExitChat());
      },
    },
  ];

  const isActiveUser = onlineUsers.includes(currentChatUserInfo?.id as string);

  return (
    <div className="z-10 flex items-center justify-between h-16 px-4 py-3 bg-panel-header-background">
      <div className="flex items-center justify-center gap-6">
        <Avatar type={"sm"} image={currentChatUserInfo?.profilePhoto} />
        <div className="flex flex-col">
          <span className="text-primary-strong">
            {currentChatUserInfo?.name}
          </span>
          <span className="text-sm text-secondary">
            {isActiveUser ? "online" : "offline"}
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <BiSearchAlt2
          className="text-xl cursor-pointer text-panel-header-icon"
          onClick={() => dispatch(setMessageSearch())}
        />
        <BsThreeDotsVertical
          className="text-xl cursor-pointer text-panel-header-icon"
          onClick={(e) => showContextMenu(e)}
          id="context-opener"
        />
        {isContextMenuVisible && (
          <ContextMenu
            options={contextMenuOptions}
            coordinates={contextMenuCoordinates}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
          />
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
