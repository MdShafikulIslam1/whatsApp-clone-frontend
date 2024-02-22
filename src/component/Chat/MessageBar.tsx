"use client";
import { useAddMessageMutation } from "@/redux/api/messageApi";
import { useAppSelector } from "@/redux/hook";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import UploadPhoto from "../UploadPhoto";
import { CldUploadButton } from "next-cloudinary";

const MessageBar = () => {
  const { currentChatUserInfo, userInfo } = useAppSelector(
    (state) => state.user
  );
  const [addMessage] = useAddMessageMutation();
  const [message, setMessage] = useState("");
  const [showEmojiModal, setShowEmojiModal] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current?.contains(event.target)
        ) {
          setShowEmojiModal(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const sendMessageHandler = async () => {
    try {
      const data: any = await addMessage({
        to: currentChatUserInfo?.id,
        from: userInfo?.id,
        message,
        type: "text",
      });

      setMessage("");
    } catch (error) {}
  };

  const handleUpload = async (result: any) => {
    const data: any = await addMessage({
      to: currentChatUserInfo?.id,
      from: userInfo?.id,
      message: result?.info?.secure_url,
      type: "image",
    });
    console.log("image message sent", data);
  };

  return (
    <div className="relative flex items-center h-20 gap-6 px-4 bg-panel-header-background">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-xl cursor-pointer text-panel-header-icon"
            title="Emoji"
            id="emoji-open"
            onClick={() => setShowEmojiModal(!showEmojiModal)}
          />

          {showEmojiModal && (
            <div
              className="absolute z-40 bottom-24 left-16"
              ref={emojiPickerRef}
            >
              <EmojiPicker
                onEmojiClick={(emoji) =>
                  setMessage((preMessage) => (preMessage += emoji.emoji))
                }
              />
            </div>
          )}

          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="kde3v72f"
          >
            <ImAttachment
              className="text-xl cursor-pointer text-panel-header-icon"
              title="Attachment file"
            />
          </CldUploadButton>
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
