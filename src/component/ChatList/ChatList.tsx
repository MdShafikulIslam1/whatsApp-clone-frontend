"use client";
import { useAppSelector } from "@/redux/hook";
import ChatListHeader from "./ChatListHeader";
import List from "./List";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import ContactsList from "./ContactsList";

const ChatList = () => {
  const allContactPage = useAppSelector((state) => state.user.contactPage);
  const [pageType, setPageType] = useState("default");
  useEffect(() => {
    if (allContactPage) {
      return setPageType("all-contacts");
    } else {
      return setPageType("default");
    }
  }, [allContactPage]);
  return (
    <div className="flex flex-col max-h-screen bg-panel-header-background">
      {pageType === "default" && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}

      {pageType === "all-contacts" && <ContactsList />}
    </div>
  );
};

export default ChatList;
