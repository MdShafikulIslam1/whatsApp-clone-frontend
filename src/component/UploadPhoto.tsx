"use client";
import { setImage } from "@/redux/feature/user/userSlice";
import { useAppDispatch } from "@/redux/hook";
import { Button, Upload } from "antd";
import { CldUploadButton } from "next-cloudinary";
import React from "react";
import { IoClose } from "react-icons/io5";

const UploadPhoto = ({ setGraphPhoto }: any) => {
  const dispatch = useAppDispatch();
  const handleUpload = (result: any) => {
    dispatch(setImage(result?.info?.secure_url));
  };
  return (
    <div className="fixed top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full flex justify-center items-center">
      <div className=" h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        <div
          className="pt-2 pe-2 cursor-pointer flex justify-end items-end text-white"
          onClick={() => setGraphPhoto(false)}
        >
          <IoClose className="h-10 w-10" />
        </div>

        <div className="flex justify-center items-center gap-16 p-20 w-full bg-white">
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="kde3v72f"
          >
            <Button type="primary" className="bg-orange-600">upload</Button>
          </CldUploadButton>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
