import React from "react";
import { BsCheck, BsCheck2All } from "react-icons/bs";

function MessageStatus({ messageStatus }: { messageStatus?: string }) {
  return (
    <>
      {messageStatus === "sent" && <BsCheck className="text-lg" />}
      {messageStatus === "delivered" && <BsCheck2All className="text-lg" />}
      {messageStatus === "read" && (
        <BsCheck2All className="text-lg text-icon-ack" />
      )}
    </>
  );
}

export default MessageStatus;
