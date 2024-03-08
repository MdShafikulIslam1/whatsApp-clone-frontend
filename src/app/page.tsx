"use client";
import Main from "@/component/Main";
import { isLogIn } from "@/service/authentication.service";
import { Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const userLoggedIn = isLogIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);
  if (!isLoading) {
    return (
      <Row
        justify={"center"}
        align={"middle"}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Space size={"large"} direction="vertical" style={{ width: "100%" }}>
          <Spin tip="Loading" size="large">
            <div className="content " />
          </Spin>
        </Space>
      </Row>
    );
  }
  return <Main />;
}
