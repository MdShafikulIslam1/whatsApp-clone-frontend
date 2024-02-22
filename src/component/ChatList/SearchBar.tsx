"use client";
import { setFilteredUsers } from "@/redux/feature/user/userSlice";
import { useAppDispatch } from "@/redux/hook";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

function SearchBar() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-3 py-3 pl-5 text-white bg-search-input-container-background h-14">
      <div className="flex items-center flex-grow gap-5 px-3 py-1 rounded-lg bg-panel-header-background">
        <div>
          <BiSearchAlt2 className="text-lg cursor-pointer text-panel-header-icon" />
        </div>
        <div>
          <input
            type="text"
            placeholder="search or start a new chat"
            className="w-full text-sm text-white bg-transparent focus:outline-none"
            onChange={(event: any) =>
              dispatch(setFilteredUsers(event.target.value))
            }
          />
        </div>
      </div>
      <div className="pl-3 pr-5">
        <BsFilter className="text-lg cursor-pointer text-panel-header-icon" />
      </div>
    </div>
  );
}

export default SearchBar;
