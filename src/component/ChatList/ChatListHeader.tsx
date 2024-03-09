import React, { useState } from "react";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Avatar from "../Avatar";
import ContextMenu from "../ContextMenu";
import { useRouter } from "next/navigation";
import { setContactPage } from "@/redux/feature/user/userSlice";
import { getUserInfo } from "@/service/authentication.service";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
function ChatListHeader() {
  const { contactPage } = useAppSelector((state) => state.user);
  const userInfo = getUserInfo();
  const { data } = useGetSingleUserQuery((userInfo as any)?.id as string);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const showContextMenu = (e: any) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
  };

  const contextMenuOptions = [
    {
      name: "Logout",
      callback: () => {
        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  return (
    <div className="flex items-center justify-between h-16 px-3 py-3">
      <div className="cursor-pointer">
        <Avatar type={"sm"} image={(data as any)?.data?.profilePhoto} />
      </div>
      <div className="flex gap-6 ">
        <BsFillChatLeftTextFill
          className="text-xl cursor-pointer text-panel-header-icon"
          title="New Chat"
          onClick={() => dispatch(setContactPage())}
        />

        <>
          <BsThreeDotsVertical
            className="text-xl cursor-pointer text-panel-header-icon"
            title="Menu"
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
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
