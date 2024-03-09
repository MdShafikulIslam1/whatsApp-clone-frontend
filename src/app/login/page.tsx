"use client";
import Form from "@/component/Form";
import FormInput from "@/component/FormInput";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hook";
import { storeUserInfo } from "@/service/authentication.service";
import { UserOutlined } from "@ant-design/icons";
import { Button, Divider, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import whatsAppLogo from "../../../public/whatsapp.gif";
import Link from "next/link";

type IFormValues = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<IFormValues> = async (data: any) => {
    try {
      const res: any = await login({ ...data }).unwrap();
      if (res?.data) {
        storeUserInfo({ accessToken: res?.data });
        message.success(res.message);
        router.push("/");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-screen h-screen gap-20 bg-panel-header-background ">
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <div className="w-[200px]">
          <Image src={whatsAppLogo} alt="whatsapp" objectFit="contain" />
        </div>
        <span className="text-5xl tracking-widest">WhatsApp</span>
      </div>

      <div>
        <div>
          <h1 className="text-white text-2xl font-bold my-4 text-center ">
            Sign in your account
          </h1>
          <div>
            <Form submitHandler={onSubmit}>
              <div>
                <FormInput
                  required={true}
                  name="email"
                  type="email"
                  label="Email"
                  size="large"
                  placeHolder="Enter your Email"
                  prefix=<UserOutlined />
                  allowClear={true}
                />
              </div>

              <div className="my-3">
                <FormInput
                  required={true}
                  name="password"
                  type="password"
                  label="Password"
                  placeHolder="Enter Correct Password"
                  size="large"
                />
              </div>

              {/* 
              //TODO: FORGET PASSWORD
              <div className="flex justify-end mb-2">
                <Link
                  href={"/forgot-password"}
                  className="underline text-white text-end cursor-pointer"
                >
                  Forgot Password ?
                </Link>
              </div> */}
              <Button
                className="bg-[#07E676]"
                block
                type="dashed"
                htmlType="submit"
              >
                Login
              </Button>
            </Form>
          </div>
          <div className="text-white flex mt-5 text-sm font-thin gap-1">
            <p className="">Are you new here?</p>
            <Link href={"/onboarding"} className="text-blue-300">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
