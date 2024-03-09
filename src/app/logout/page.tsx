/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { authKey } from "@/constant/keys/authKey";
import { setUserInfo } from "@/redux/feature/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeUserInfo } from "@/service/authentication.service";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Logout() {
  const router = useRouter();

  useEffect(() => {
    removeUserInfo(authKey);
    router.push("/login");
  }, []);

  return <div className="bg-conversation-panel-background"></div>;
}

export default Logout;
