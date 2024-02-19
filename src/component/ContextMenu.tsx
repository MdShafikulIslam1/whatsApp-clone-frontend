import React, { useEffect, useRef } from "react";

function ContextMenu({
  options,
  coordinates,
  contextMenu,
  setContextMenu,
}: any) {
  
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any, callback: any) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };

  useEffect(() => {
    const handleContextMenu = (e: any) => {
      if (e.target.id !== "context-opener") {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current?.contains(e.target)
        ) {
          setContextMenu(false);
        }
      }
    };

    document.addEventListener("click", handleContextMenu);

    return () => {
      document.removeEventListener("click", handleContextMenu);
    };
  }, [setContextMenu]);

  return (
    <div
      className="fixed bg-dropdown-background py-2 z-[100] shadow-2xl "
      style={{ top: coordinates.y, left: coordinates.x }}
      ref={contextMenuRef}
    >
      <ul>
        {options.map(({ name, callback }: any) => (
          <li
            key={"1"}
            onClick={(e) => handleClick(e, callback)}
            className="px-5 py-2 cursor-pointer hover:bg-gray-400 hover:tracking-widest"
          >
            <span className="z-50 text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
