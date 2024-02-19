// import React, { useState } from "react";
// import Avatar from "../common/Avatar";
// import { useStateProvider } from "@/context/StateContext";
// import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
// import { actionCases } from "@/context/constants";
// import { useRouter } from "next/router";
// import ContextMenu from "../common/ContextMenu";
// function ChatListHeader() {
//   const [{ userInfo }, dispatch] = useStateProvider();
//   const router = useRouter();

//   const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
//   const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
//     x: 0,
//     y: 0,
//   });

//   const showContextMenu = (e) => {
//     e.preventDefault();
//     setIsContextMenuVisible(true);
//     setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
//   };

//   const contextMenuOptions = [
//     {
//       name: "Logout",
//       callback: () => {
//         setIsContextMenuVisible(false);
//         router.push("/logout");
//       },
//     },
//   ];

//   const handleAllContactPage = () => {
//     dispatch({ type: actionCases.SET_ALL_CONTACT_PAGE });
//   };

//   return (
//     <div className="flex items-center justify-between h-16 px-3 py-3">
//       <div className="cursor-pointer">
//         <Avatar type={"sm"} image={userInfo?.profilePhoto} />
//       </div>
//       <div className="flex gap-6 ">
//         <BsFillChatLeftTextFill
//           className="text-xl cursor-pointer text-panel-header-icon"
//           title="New Chat"
//           onClick={handleAllContactPage}
//         />

//         <>
//           <BsThreeDotsVertical
//             className="text-xl cursor-pointer text-panel-header-icon"
//             title="Menu"
//             onClick={(e) => showContextMenu(e)}
//             id="context-opener"
//           />
//           {isContextMenuVisible && (
//             <ContextMenu
//               options={contextMenuOptions}
//               coordinates={contextMenuCoordinates}
//               contextMenu={isContextMenuVisible}
//               setContextMenu={setIsContextMenuVisible}
//             />
//           )}
//         </>
//       </div>
//     </div>
//   );
// }

// export default ChatListHeader;

import React from 'react'

const ChatListHeader = () => {
  return (
    <div>
      this is a chat list header
    </div>
  )
}

export default ChatListHeader
