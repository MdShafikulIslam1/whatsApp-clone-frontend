"use client";
import { useGetInitialContactsWithMessagesQuery } from "@/redux/api/messageApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import ChatLIstItem from "./ChatLIstItem";
import { setAllUsers } from "@/redux/feature/user/userSlice";
import { useEffect } from "react";
import { getUserInfo } from "@/service/authentication.service";

function List() {
  const dispatch = useAppDispatch();
  const { allUsers, filteredUsers } = useAppSelector((state) => state.user);

  const userInfo: any = getUserInfo();
  const { data, isLoading } = useGetInitialContactsWithMessagesQuery(
    userInfo?.id
  );

  useEffect(() => {
    if (!isLoading) {
      dispatch(setAllUsers((data as any)?.data?.users));
    }
  }, [isLoading, dispatch, data]);

  return (
    <div className="flex-auto max-h-full overflow-auto bg-search-input-container-background custom-scrollbar">
      {filteredUsers && filteredUsers.length > 0
        ? filteredUsers.map((contact: any) => (
            <ChatLIstItem data={contact} key={contact?.id} />
          ))
        : allUsers?.map((contact: any) => (
            <ChatLIstItem data={contact} key={contact?.id} />
          ))}
    </div>
  );
}

export default List;
