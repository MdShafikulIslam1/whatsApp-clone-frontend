"use client"
import { setUserInfo } from "@/redux/feature/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Logout() {
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(
      setUserInfo({
        about: null,
        email: null,
        name: null,
        profilePhoto: null,
        id: null,
      })
    );
    signOut(firebaseAuth);
    router.push("/login");
  }, [dispatch, router]);

  return <div className="bg-conversation-panel-background"></div>;
}

export default Logout;
