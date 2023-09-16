"use client";

import { signIn, signOut } from "next-auth/react";
import { Alert, Button, Checkbox, Form, Input, message } from "antd";
import {
  GoogleCircleFilled,
  FacebookFilled,
  GithubFilled,
} from "@ant-design/icons";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";
import FormData from "form-data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const base_url = process.env.NEXT_PUBLIC_API_BASS_URL;

  const onFinish = async (values) => {
    setLoading(true);
    const name = values.name;
    const email = values.email;
    const password = values.password;

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const respond = await axios.post(
        `${base_url}/api/v1/user/signup`,
        formData
      );
      console.log(respond);
      if (respond.data.code === "200") {
        console.log("success : ", respond.data.message);
        message.success(respond.data.message);
        router.push("/sign-in");
      } else {
        console.log("error : ", respond.data.message);
        message.error(respond.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error(error);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
      <div className="container d-flex justify-content-center align-items-center flex-column ">
        <div
          style={{
            backgroundColor: "#f6f4eb",
          }}
          className="d-flex justify-content-center align-items-center flex-column border border-black p-5 rounded register-container"
        >
          <div>
            <Form
              layout="vertical"
              name="register"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                sm: 24,
                xs: 24,
                md: 24,
                xl: 24,
                xxl: 24,
              }}
              // style={{
              //   width: 800,
              // }}
              className="register-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input size="large" width={"800px"} />
              </Form.Item>

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
                    offset: 6,
                    span: 18,
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
                  Register
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
            <p>
              Already have an account?{" "}
              <Link
                style={{
                  color: "#000",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                href="/sign-in"
              >
                Sign in
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
