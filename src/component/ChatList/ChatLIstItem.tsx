"use client";
import React from "react";

import { FaCamera, FaMicrophone } from "react-icons/fa";
import Avatar from "../Avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setContactPage,
  setCurrentChatUserInfo,
} from "@/redux/feature/user/userSlice";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../MessageStatus";
import { getUserInfo } from "@/service/authentication.service";

function ChatLIstItem({ data, isContactPage = false }: any) {
  const { currentChatUserInfo } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const userInfo: any = getUserInfo();
  const handleContactClick = () => {
    if (!isContactPage) {
      dispatch(
        setCurrentChatUserInfo({
          name: data.name,
          about: data.about,
          email: data.email,
          profilePhoto: data.profilePhoto,
          id: userInfo?.id === data?.id ? null : data.id,
        })
      );
    } else {
      dispatch(setCurrentChatUserInfo({ ...data }));
      dispatch(setContactPage());
    }
  };

  return (
    <div
      className={`flex items-center cursor-pointer hover:bg-background-default-hover`}
      onClick={handleContactClick}
    >
      <div className="px-4 pt-3 pb-1 min-w-fit">
        <Avatar type={"lg"} image={data?.profilePhoto} />
      </div>

      <div className="flex flex-col justify-center w-full min-h-full pr-2 mt-3">
        <div className="flex justify-between">
          <div>
            <span className="text-white">{data?.name}</span>
          </div>
          {!isContactPage && (
            <div>
              <span
                className={`${
                  data?.totalUnreadMessages > 0
                    ? "text-icon-green"
                    : "text-secondary"
                } text-sm`}
              >
                {calculateTime(data?.createdAt)}
              </span>
            </div>
          )}
        </div>
        <div className="flex pt-1 pb-2 border-b pe-3 border-conversation-border">
          <div className="flex justify-between w-full">
            <span className="text-sm text-secondary line-clamp-1">
              {isContactPage ? (
                data?.about || "\u00A0"
              ) : (
                <div className="flex items-center  gap-1 max-w-[200px] sm:max-w-[250px] md:max-w-[300px]  lg:max-w-[200px] xl:max-w-[300px] ">
                  {data?.senderId === userInfo?.id && (
                    <MessageStatus messageStatus={data?.messageStatus} />
                  )}

                  {data?.type === "text" && (
                    <span className="truncate">{data?.message}</span>
                  )}

                  {data?.type === "image" && (
                    <div className="flex items-center gap-1">
                      <FaCamera className="text-panel-header-icon" />
                      Image
                    </div>
                  )}
                </div>
              )}
            </span>
            {data?.totalUnreadMessages > 0 && (
              <span className="bg-icon-green px-12 rounded-full text-sm">
                {data?.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
