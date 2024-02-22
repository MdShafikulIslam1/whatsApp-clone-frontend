import { IMessage, setMessageSearch } from "@/redux/feature/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { calculateTime } from "@/utils/CalculateTime";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

function SearchMessages() {
  const { currentChatUserInfo, messages } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMessages, setSearchedMessages] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setSearchedMessages(
        (messages as []).filter(
          (message: IMessage) =>
            message.type === "text" && message?.message?.includes(searchTerm)
        )
      );
    } else {
      setSearchedMessages([]);
    }
  }, [searchTerm, messages]);

  return (
    <div className="z-10 flex flex-col w-full max-h-screen border-l border-conversation-border bg-conversation-panel-background">
      <div className="flex items-center h-16 gap-10 px-4 py-5 bg-panel-header-background text-primary-strong">
        <IoClose
          className="text-2xl cursor-pointer text-icon-lighter"
          onClick={() => dispatch(setMessageSearch())}
        />
        <span>search messages</span>
      </div>

      <div className="h-full overflow-auto custom-scrollbar">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center w-full gap-3 px-5 h-14">
            <div className="flex items-center flex-grow gap-5 px-3 py-1 rounded-lg bg-panel-header-background">
              <div>
                <BiSearchAlt2 className="text-lg cursor-pointer text-panel-header-icon" />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="search messages"
                  className="w-full text-sm text-white bg-transparent focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <span className="mt-10 text-secondary">
            {!searchTerm &&
              `Search for message with ${currentChatUserInfo?.name}`}
          </span>
        </div>
        <div className="flex flex-col justify-center h-full">
          {searchTerm.length > 0 && !searchedMessages.length && (
            <span className="flex justify-center w-full text-secondary ">
              No messages found
            </span>
          )}

          <div className="flex flex-col w-full h-full">
            {searchedMessages.map((message, index) => (
              <div
                key={index}
                className="flex justify-center flex-col cursor-pointer hover:bg-background-default-hover w-full px-5 border-b-[0.1] py-5 border-secondary"
              >
                <div className="text-sm text-secondary">
                  {calculateTime((message as any)?.createdAt)}
                </div>
                <div className="text-icon-green">
                  {(message as any)?.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
