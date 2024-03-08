"use client";
import Form from "@/component/Form";
import FormInput from "@/component/FormInput";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hook";
import { storeUserInfo } from "@/service/authentication.service";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

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
    <div className="flex  items-center justify-center w-screen h-screen gap-40 bg-panel-header-background ">
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <Image src={"/whatsapp.gif"} alt="whatsapp" height={300} width={300} />
        <span className="text-5xl">Whatsapp</span>
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

              <div className="flex justify-end mb-2">
                <Link
                  href={"/forgot-password"}
                  className="underline text-white text-end cursor-pointer"
                >
                  Forgot Password ?
                </Link>
              </div>
              <Button
                className="bg-orange-600"
                block
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
