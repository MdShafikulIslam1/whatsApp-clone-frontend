"use client";
import { useAddMessageMutation } from "@/redux/api/messageApi";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

const MessageBar = () => {
  const { currentChatUserInfo, userInfo, socket } = useAppSelector(
    (state) => state.user
  );
  const [message, setMessage] = useState("");
  const [addMessage] = useAddMessageMutation();

  const sendMessageHandler = async () => {
    try {
      const data: any = await addMessage({
        to: currentChatUserInfo?.id,
        from: userInfo?.id,
        message,
      });
      socket?.emit("send-message", {
        to: currentChatUserInfo?.id,
        from: userInfo?.id,
        message: data?.data?.data?.message,
      });
      setMessage("");
    } catch (error) {}
  };

  return (
    <div className="relative flex items-center h-20 gap-6 px-4 bg-panel-header-background">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-xl cursor-pointer text-panel-header-icon"
            title="Emoji"
            id="emoji-open"
          />

          <ImAttachment
            className="text-xl cursor-pointer text-panel-header-icon"
            title="Attachment file"
          />
        </div>
        <div className="flex items-center w-full h-10 rounded-lg">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full h-10 px-5 text-sm text-white rounded-lg bg-input-background focus:outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>

        <div className="flex items-center justify-center w-10">
          <button type="submit">
            <MdSend
              className="text-xl cursor-pointer text-panel-header-icon"
              title="Send Message"
              onClick={sendMessageHandler}
            />
          </button>
        </div>
      </>
    </div>
  );
};

export default MessageBar;
