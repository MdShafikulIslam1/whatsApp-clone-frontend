"use client";
import Image from "next/image";
import Form from "@/component/Form";
import FormInput from "@/component/FormInput";
import { Button, message } from "antd";
import { useAppSelector } from "@/redux/hook";
import { useOnboardUserMutation } from "@/redux/api/authApi";
import Avatar from "@/component/Avatar";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const { image, userInfo } = useAppSelector((state) => state.user);
  const [onboardUser] = useOnboardUserMutation();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    data.profilePhoto = image;
    data.email = userInfo?.email;
    if (!image || !userInfo?.email) {
      message.error("please login first");
      return router.push("/login");
    }
    try {
      const result: any = await onboardUser(data).unwrap();
      if (result?.success) {
        message.success(result.message);
        router.push("/");
      }
    } catch (error) {
      message.error("Something wrong about onboarding user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-6 bg-panel-header-background">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src={"/whatsapp.gif"} alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <h2 className="text-2xl text-white">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center gap-5 mt-5">
          {/* <Input name="Display Name" state={name} setState={setName} label /> */}
          {/* <Input name="About" state={about} setState={setAbout} label /> */}
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                required
                name="name"
                label="Display Name"
                size="large"
                placeHolder="Enter Display Name"
              />
            </div>
            <div className="mt-6">
              <FormInput
                required
                name="about"
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
