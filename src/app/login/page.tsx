"use client";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { useCheckUserMutation } from "@/redux/api/authApi";
import { setNewUser, setUserInfo } from "@/redux/feature/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { firebaseAuth } from "@/utils/firebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [checkUser] = useCheckUserMutation();
  const handleLogin = async () => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, googleProvider);

    if (user) {
      const { displayName: name, email, photoURL: profilePhoto } = user;
      try {
        // const response: any = await checkUser({ email }).unwrap();
        const { data } = await axios.post(`${getBaseUrl()}/auth/check-user`, {
          email,
        });
        
        if (data?.success) {
          const { id, name, about, email, profilePhoto } = data?.data!;
          dispatch(setUserInfo({ id, name, about, email, profilePhoto }));
          router.push("/");
        }
      } catch (error: any) {
        if (!error?.response?.data?.success) {
          alert("error")
          dispatch(setNewUser(true));
          dispatch(
            setUserInfo({
              name: name,
              email,
              profilePhoto,
              about: "",
            })
          );
          router.push("/onboarding");
        }
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-6 bg-panel-header-background">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src={"/whatsapp.gif"} alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <button
        onClick={handleLogin}
        className="flex items-center justify-center p-5 rounded-lg gap-7 bg-search-input-container-background"
      >
        <FcGoogle className="text-4xl" />
        <span className="text-2xl text-white">Login with google</span>
      </button>
    </div>
  );
};

export default LoginPage;
