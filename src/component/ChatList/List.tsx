// import { useStateProvider } from "@/context/StateContext";
// import { actionCases } from "@/context/constants";
// import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
// import axios from "axios";
// import React, { useEffect } from "react";
// import ChatLIstItem from "./ChatLIstItem";

// function List() {
//   const [{ userInfo, userContacts, filteredContacts }, dispatch] =
//     useStateProvider();

//   useEffect(() => {
//     const getInitialContactsWithMessages = async () => {
//       try {
//         const {
//           data: { users, onlineUsers },
//         } = await axios.get(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);

//         dispatch({ type: actionCases.SET_USERS_CONTACTS, userContacts: users });
//         dispatch({ type: actionCases.SET_ONLINE_USERS, onlineUsers });

//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (userInfo?.id) getInitialContactsWithMessages();
//   }, []);
//   return (
//     <div className="flex-auto max-h-full overflow-auto bg-search-input-container-background custom-scrollbar">
//       {filteredContacts && filteredContacts.length > 0
//         ? filteredContacts.map((contact) => (
//             <ChatLIstItem data={contact} key={contact?.id} />
//           ))
//         : userContacts.map((contact) => (
//             <ChatLIstItem data={contact} key={contact?.id} />
//           ))}
//     </div>
//   );
// }

// export default List;

import React from 'react'

const List = () => {
  return (
    <div>
      this is List
    </div>
  )
}

export default List
