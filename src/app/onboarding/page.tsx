"use client";
import Image from "next/image";
import Form from "@/component/Form";
import FormInput from "@/component/FormInput";
import { Button, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Avatar from "@/component/Avatar";
import { useRouter } from "next/navigation";
import { setNewUser, setUserInfo } from "@/redux/feature/user/userSlice";
import { useCreateAccountMutation } from "@/redux/api/authApi";

const OnboardingPage = () => {
  const { image, userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [createAccount] = useCreateAccountMutation();
  const router = useRouter();
  const onSubmit = async (formData: any) => {
    formData.profilePhoto = image;

    try {
      const data: any = await createAccount(formData).unwrap();
      if (data?.success) {
        // const { id, name, about, email, profilePhoto } = data?.data!;
        message.success(data.message);
        // dispatch(setUserInfo({ id, name, about, email, profilePhoto }));
        router.push("/login");
      }
    } catch (error: any) {
      console.error("create account",error);
      message.error("Something wrong about onboarding user");
    }
  };

  return (
    <div className="flex flex-col items-center  w-screen h-screen gap-6 bg-panel-header-background">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src={"/whatsapp.gif"} alt="whatsapp" height={200} width={200} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <h2 className="text-2xl text-white">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center gap-5 mt-5">
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                required
                name="name"
                type="text"
                label="Full Name"
                size="large"
                placeHolder="Enter Full Name"
              />
            </div>
            <div>
              <FormInput
                required
                name="email"
                type="email"
                label="Email"
                size="large"
                placeHolder="Enter your valid email"
              />
            </div>
            <div>
              <FormInput
                required
                name="password"
                type="password"
                label="Password"
                size="large"
                placeHolder="Enter Password"
              />
            </div>
            <div className="mt-6">
              <FormInput
                required
                name="about"
                type="text"
                label="About"
                size="large"
                placeHolder="Enter Bio"
              />
            </div>
            <div className="flex justify-center items-center mt-8">
              <Button
                block
                htmlType="submit"
                className="flex items-center justify-center p-5 rounded-lg gap-7 bg-search-input-container-background text-white"
              >
                Create Profile
              </Button>
            </div>
          </Form>
        </div>
        <div>
          <Avatar type={"xl"} image={image} />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
