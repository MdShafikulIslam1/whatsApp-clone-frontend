import React from "react";
import ChatHeader from "./ChatHeader";
import MessageBar from "./MessageBar";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  return (
    <div className="w-full border-l border-conversation-border bg-conversation-panel-background h-[100vh] flex flex-col z-10">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
};

export default Chat;
