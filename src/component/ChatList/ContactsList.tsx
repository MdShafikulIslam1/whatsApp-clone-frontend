"use client";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { setAllUsers, setContactPage } from "@/redux/feature/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";
import { useGetAllUserQuery } from "@/redux/api/authApi";

const ContactsList = () => {
  const dispatch = useAppDispatch();
  const [allContacts, setAllContacts] = useState<any[]>([]);
  const [searchContacts, setSearchContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllUserQuery({});

  useEffect(() => {
    if (!isLoading) {
      setAllContacts((data as any)?.data);
      setSearchContacts((data as any)?.data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (searchTerm.length) {
      const filterData: any = {};
      Object.keys(allContacts).forEach((key: any) => {
        filterData[key] = allContacts[key].filter((obj: any) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setSearchContacts(filterData);
    } else {
      setSearchContacts(allContacts);
    }
  }, [searchTerm, allContacts]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-end h-24 px-3 py-5">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="text-lg cursor-pointer "
            title="Back to chat list"
            onClick={() => dispatch(setContactPage())}
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="flex items-center gap-3 pl-5 text-white bg-search-input-container-background h-14">
        <div className="flex items-center flex-grow gap-5 py-1 rounded-lg bg-panel-header-background">
          <div>
            <BiSearchAlt2 className="text-lg cursor-pointer text-panel-header-icon" />
          </div>
          <div>
            <input
              type="text"
              placeholder="search contacts"
              className="w-full text-sm text-white bg-transparent focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {!isLoading &&
        (data as any)?.data &&
        Object.entries(searchContacts as Record<string, any>).map(
          ([initialLetter, userList]) => {
            return (
              (userList as [])?.length > 0 && (
                <div key={Date.now() + initialLetter}>
                  <div className="py-5 pl-10 text-teal-light">
                    {initialLetter}
                  </div>

                  {(userList as [])?.map((user: any) => {
                    return (
                      <ChatLIstItem
                        key={user?.id}
                        data={user}
                        isContactPage={true}
                      />
                    );
                  })}
                </div>
              )
            );
          }
        )}
    </div>
  );
};

export default ContactsList;
