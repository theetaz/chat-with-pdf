"use client";

import { signIn, useSession } from "next-auth/react";
import { Button, Checkbox, Form, Input, message } from "antd";
import {
  GoogleCircleFilled,
  FacebookFilled,
  GithubFilled,
} from "@ant-design/icons";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    console.log("result from cred :", result);
    setResult(result);
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (result) {
      console.log("result", result);
      if (result.status === 200 && result.error === null) {
        router.push("/");
      }
      if (result.error === "CredentialsSignin") {
        console.log("Invalid email or password");
        message.error("Invalid email or password");
      }
    }
  }, [result]);

  useEffect(() => {
    if (session?.provider === "google") {
      console.log("session", session?.provider);
      router.push("/");
    }
  }, [session]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <NavBar />
      </div>
      <div className="container d-flex justify-content-center align-items-center flex-column  ">
        <div
          style={{
            backgroundColor: "#f6f4eb",
          }}
          className="d-flex justify-content-center align-items-center flex-column border border-black p-5  rounded sign-in-container"
        >
          <div>
            <Form
              layout="vertical"
              name="sign-in"
              labelCol={{
                sm: 6,
                xs: 4,
                md: 6,
                xl: 4,
                xxl: 6,
              }}
              wrapperCol={{
                sm: 24,
                xs: 24,
                md: 24,
                xl: 24,
                xxl: 24,
              }}
              // style={{
              //   width: 300,
              // }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="sign-in-form"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input size="large" width={"800px"} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  xs: {
                    offset: 0,
                    span: 24,
                  },
                  md: {
                    offset: 6,
                    span: 18,
                  },
                  lg: {
                    offset: 11,
                    span: 24,
                  },
                  xl: {
                    offset: 11,
                    span: 14,
                  },
                  xxl: {
                    offset: 11,
                    span: 13,
                  },
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  xs: {
                    offset: 9,
                    span: 15,
                  },
                  md: {
                    offset: 6,
                    span: 18,
                  },
                  lg: {
                    offset: 11,
                    span: 24,
                  },
                  xl: {
                    offset: 11,
                    span: 14,
                  },
                  xxl: {
                    offset: 11,
                    span: 13,
                  },
                }}
              >
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            <p>or sign in with, </p>
          </div>
          <div
            className="d-flex"
            style={{
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => signIn("google")}
            >
              <GoogleCircleFilled
                style={{
                  fontSize: "40px",
                  color: "#DB4437",
                }}
              />
            </div>

            <div
              style={{
                cursor: "not-allowed",
              }}
              // onClick={() => signIn("facebook")}
            >
              <FacebookFilled
                style={{
                  fontSize: "40px",
                  color: "#237cf3",
                }}
              />
            </div>
            <div
              style={{
                cursor: "not-allowed",
              }}
              // onClick={() => signIn("github")}
            >
              <GithubFilled
                style={{
                  fontSize: "40px",
                  color: "#000",
                }}
              />
            </div>
          </div>

          <div className="mt-3 text-center">
            <p
              style={{
                marginBottom: "0px",
              }}
            >
              Don't have an account?{" "}
              <Link
                href="/register"
                style={{
                  color: "#000",
                }}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Footer />
      </div>
    </div>
  );
};

export default page;
