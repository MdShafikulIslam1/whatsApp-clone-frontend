"use client";
import { onAuthStateChanged } from "firebase/auth";
import ChatList from "./ChatList/ChatList";
import Empty from "./Empty";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCheckUserMutation } from "@/redux/api/authApi";

const Main = () => {
  const router = useRouter();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  const [checkUser] = useCheckUserMutation();

  useEffect(() => {
    if (redirectToLogin) router.push("/login");
  }, [redirectToLogin, router]);

  // onAuthStateChanged(firebaseAuth, async (currentUser) => {
  //   if (!currentUser) setRedirectToLogin(true);
  //   if (currentUser?.email && !userInfo) {
  //     const response = await checkUser({ email: currentUser?.email });
  //     console.log("response from main", response);
  //     if (!(response as any)?.error?.success) {
  //       router.push("/login");
  //     }
  //     //   if (response?.data?.data) {
  //     //     const { id, name, about, email, profilePhoto } = data?.data;
  //     //     dispatch({
  //     //       type: actionCases.SET_USER_INFO,
  //     //       userInfo: {
  //     //         id,
  //     //         name,
  //     //         email,
  //     //         profilePhoto,
  //     //         status: about,
  //     //       },
  //     //     });
  //     //   }
  //   }
  // });
  return (
    <>
      <div className="grid grid-cols-main w-screen h-screen max-h-screen overflow-hidden">
        <ChatList />
        <Empty />
        <p style={{ fontSize: "40px" }} className="text-orange-700 text-5xl">
          wow
        </p>
      </div>
    </>
  );
};

export default Main;
