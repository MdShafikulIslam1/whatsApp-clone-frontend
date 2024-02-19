import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <div className="flex items-center justify-center w-full h-screen border-b-8 border-l-4 border-conversation-border bg-panel-header-background border-b-icon-green">
      <Image src={"/whatsapp.gif"} alt="whatsapp" height={300} width={300} />
    </div>
  );
}

export default Empty;
