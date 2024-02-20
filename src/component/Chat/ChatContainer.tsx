import React from "react";

function ChatContainer() {
  return (
    <div className="h-[80vh] w-full flex-grow relative overflow-auto custom-scrollbar">
      <div className="fixed z-0 w-full h-full bg-fixed bg-chat-background opacity-30"></div>
      <div className="relative bottom-0 left-0 z-40 mx-10 my-6"></div>
    </div>
  );
}

export default ChatContainer;
