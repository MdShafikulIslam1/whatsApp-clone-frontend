import { useGetInitialContactsWithMessagesQuery } from "@/redux/api/messageApi";
import { useAppSelector } from "@/redux/hook";
import ChatLIstItem from "./ChatLIstItem";

function List() {
  const { userInfo } = useAppSelector((state) => state.user);
  const { data } = useGetInitialContactsWithMessagesQuery(userInfo?.id);
  const userContacts = (data as any)?.data?.users;

  return (
    <div className="flex-auto max-h-full overflow-auto bg-search-input-container-background custom-scrollbar">
      {/* {filteredContacts && filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <ChatLIstItem data={contact} key={contact?.id} />
          ))
        : userContacts.map((contact) => (
            <ChatLIstItem data={contact} key={contact?.id} />
          ))} */}

      {userContacts?.map((contact: any) => (
        <ChatLIstItem data={contact} key={contact?.id} />
      ))}
    </div>
  );
}

export default List;
