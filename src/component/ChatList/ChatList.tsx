import ChatListHeader from "./ChatListHeader";
import List from "./List";
import SearchBar from "./SearchBar";

const ChatList = () => {
  return (
    <div className="flex flex-col max-h-screen bg-panel-header-background">
      {/* {pageType === "default" && (
      <>
        <ChatListHeader />
        <SearchBar />
        <List />
      </>
    )}

    {pageType === "all-contacts" && <ContactsList />} */}
      <>
        <ChatListHeader />
        <SearchBar />
        <List />
      </>
    </div>
  );
};

export default ChatList;
