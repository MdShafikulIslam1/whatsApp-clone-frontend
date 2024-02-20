"use client";
import { onAuthStateChanged } from "firebase/auth";
import ChatList from "./ChatList/ChatList";
import Empty from "./Empty";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCheckUserMutation } from "@/redux/api/authApi";
import { setUserInfo } from "@/redux/feature/user/userSlice";
import Chat from "./Chat/Chat";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";

const Main = () => {
  const router = useRouter();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  const [checkUser] = useCheckUserMutation();

  useEffect(() => {
    if (redirectToLogin) router.push("/login");
  }, [redirectToLogin, router]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (!currentUser) setRedirectToLogin(true);

      try {
        if (currentUser?.email && !userInfo) {
          // const response: any = await checkUser({
          //   email: currentUser?.email,
          // }).unwrap();

          const { data } = await axios.post(`${getBaseUrl()}/auth/check-user`, {
            email: currentUser?.email,
          });

          if (data?.success) {
            const { id, name, about, email, profilePhoto } = data?.data!;
            dispatch(setUserInfo({ id, name, about, email, profilePhoto }));
          }
        }
      } catch (error: any) {
        if (!error?.response?.data?.success) {
          setRedirectToLogin(true);
        }
      }
    });
  }, [checkUser, userInfo, dispatch]);
  return (
    <>
      <div className="grid grid-cols-main w-screen h-screen max-h-screen overflow-hidden">
        <ChatList />
        {/* <Empty /> */}
        <Chat />
      </div>
    </>
  );
};

export default Main;
