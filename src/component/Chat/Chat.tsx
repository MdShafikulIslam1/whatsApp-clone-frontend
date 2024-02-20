import React from "react";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  return (
    <div className="w-full border-l border-conversation-border bg-conversation-panel-background h-[100vh] flex flex-col z-10">
      <ChatHeader />
    </div>
  );
};

export default Chat;
