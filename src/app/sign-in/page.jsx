"use client";

import { signIn, signOut, getCsrfToken } from "next-auth/react";
import { Button, Checkbox, Form, Input } from "antd";
import {
  GoogleCircleFilled,
  FacebookFilled,
  GithubFilled,
} from "@ant-design/icons";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

const onFinish = async (values) => {
  console.log("Success:", values);
  result = await signIn("credentials-provider", {
    email: values.email,
    password: values.password,
    redirect: false,
    callbackUrl: "http://localhost:3000/sign-in",

    csrfToken: getCsrfToken(),
  });
  await signIn("credentials-provider", {
    email: values.email,
    password: values.password,
    redirect: false,
    callbackUrl: "http://localhost:3000/sign-in",
  });
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const page = () => {
  const csrfToken = getCsrfToken();
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
          className="d-flex justify-content-center align-items-center flex-column border border-black p-5 rounded"
        >
          <div>
            <Form
              action={"/api/auth/callback/credentials"}
              method="post"
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              style={{
                width: 800,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
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
                  offset: 10,
                  span: 14,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <Form.Item
                wrapperCol={{
                  offset: 11,
                  span: 13,
                }}
              >
                <Button type="primary" htmlType="submit">
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
                cursor: "pointer",
              }}
              onClick={() => signIn("facebook")}
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
                cursor: "pointer",
              }}
              onClick={() => signIn("github")}
            >
              <GithubFilled
                style={{
                  fontSize: "40px",
                  color: "#000",
                }}
              />
            </div>
          </div>

          <div className="mt-3">
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
