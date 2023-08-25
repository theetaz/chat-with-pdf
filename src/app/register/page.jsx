"use client";

import { signIn, signOut } from "next-auth/react";
import { Button, Checkbox, Form, Input } from "antd";
import {
  GoogleCircleFilled,
  FacebookFilled,
  GithubFilled,
} from "@ant-design/icons";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const page = () => {
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
                label="Name"
                name="username"
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
                  offset: 11,
                  span: 13,
                }}
              >
                <Button type="primary" htmlType="submit">
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