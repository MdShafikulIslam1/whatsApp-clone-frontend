"use client";
import { onAuthStateChanged } from "firebase/auth";
import ChatList from "./ChatList/ChatList";
import Empty from "./Empty";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCheckUserMutation } from "@/redux/api/authApi";
import { setMessage, setUserInfo } from "@/redux/feature/user/userSlice";
import Chat from "./Chat/Chat";
import { useGetAllMessageQuery } from "@/redux/api/messageApi";

const Main = () => {
  const router = useRouter();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { userInfo, currentChatUserInfo } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  const [checkUser] = useCheckUserMutation();
  const { data, isLoading, isSuccess } = useGetAllMessageQuery({
    from: userInfo?.id,
    to: currentChatUserInfo?.id,
  });

  if (isLoading) {
    ("please wait...");
  }

  useEffect(() => {
    if (!isLoading && isSuccess) {
      dispatch(setMessage((data as any)?.data));
    }
  }, [isLoading, isSuccess, dispatch, data]);

  useEffect(() => {
    if (redirectToLogin) router.push("/login");
  }, [redirectToLogin, router]);

  //user persistency with firebase
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (!currentUser) setRedirectToLogin(true);

      try {
        if (currentUser?.email && !userInfo) {
          const data: any = await checkUser({
            email: currentUser?.email,
          }).unwrap();

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
        {currentChatUserInfo?.id ? <Chat /> : <Empty />}
      </div>
    </>
  );
};

export default Main;
