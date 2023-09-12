"use client";

import { Layout, Button, theme, Menu } from "antd";

import Link from "next/link";

import {
  FacebookFilled,
  TwitterOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Uploader from "@/components/Uploader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import APIClient from "@/lib/axiosInterceptor";

const { Sider, Content } = Layout;

export default function ChatLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [recentChats, setRecentChats] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [localUserId, setLocalUserId] = useState(null);
  const [unregUserdata, setUnregUserdata] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASS_URL;

  const getUserId = () => {
    let userId = "";
    if (session) {
      const decoded = jwt.decode(session.accessToken);
      console.log("decoded :", decoded.userid);
      userId = decoded.userid;
      setUserId(userId);
    }
    if (!session) {
      setUserId(localUserId);
    }
  };

  useEffect(() => {
    getUserId();
  }, [session]);

  //push to sign in if session is null
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/sign-in");
  //   }
  // }, [session]);

  useEffect(() => {
    let localUserId = "";

    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem("localUserId")) {
        // If it exists, retrieve the unique ID
        localUserId = localStorage.getItem("localUserId");
        console.log("localUserId :", localUserId);
        setLocalUserId(localUserId);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchRecentChats();
  }, [userId, session]);

  //fetch recent chats from backend
  const fetchRecentChats = async () => {
    if (session) {
      try {
        const response = await APIClient.get(
          `/api/v1/chatdoc/recent_chat?userid=${userId}`
        );
        const data = response.data;

        setRecentChats(data.result.recent_chats);
      } catch (error) {
        console.log("error :", error);
      }
    }
  };

  // useEffect(() => {
  //   if (session) {
  //     if (userId) {
  //       fetchRecentChats();
  //     }
  //   }

  //   if (!session && unregUserdata && userId) {
  //     fetchRecentChats();
  //   }
  // }, [userId, selectedKey, unregUserdata, session]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const urlParam = useSelector((state) => state.data.setUrlParam);

  useEffect(() => {
    setSelectedKey(urlParam);
  }, [urlParam]);

  const items = recentChats?.map((chat) => {
    return {
      key: chat.source_id,
      icon: <MessageOutlined />,
      label: chat.source_name,
      type: "MenuItemType",
    };
  });

  const handleClick = (e) => {
    setSelectedKey(e.key);
    router.push(`/chat/${e.key}`);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
        width={300}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="site-layout-background"
      >
        <div className="sider-uploader">
          <Uploader />
        </div>
        <Menu
          theme={"dark"}
          onClick={handleClick}
          style={{
            width: "full",
          }}
          mode="inline"
          items={items}
          selectedKeys={selectedKey}
        />
        {!session && (
          <>
            <div
              style={{
                padding: "10px",
                textAlign: "center",
                fontSize: "16px",
                color: "#e2e3e7",
              }}
            >
              Register to save your chat history
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => router.push("/register")}
            >
              <Button
                style={{
                  textDecoration: "none",
                }}
                href={"/register"}
              >
                Register
              </Button>
            </div>
          </>
        )}
        <div
          style={{
            marginTop: "auto",
          }}
        >
          {/* <div
            style={{
              padding: "10px",
            }}
          >
            <Button
              style={{
                background: "transparent",
                color: "white",
                width: "100%",
                fontSize: "12px",
              }}
            >
              Sign in to save your chat history
            </Button>
          </div> */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                padding: "10px",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  marginRight: "8px",
                  color: "white",
                }}
                href="/"
              >
                Home
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  marginRight: "8px",
                  color: "white",
                }}
                href="/"
              >
                Account
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  marginRight: "8px",
                  color: "white",
                }}
                href="/"
              >
                API
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  marginRight: "8px",
                  color: "white",
                }}
                href="/"
              >
                FAQ
              </Link>
            </div>
            <div
              style={{
                padding: "10px",
                display: "flex",
              }}
            >
              <div
                style={{
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TwitterOutlined
                  style={{
                    color: "white",
                  }}
                />
              </div>
              <div
                style={{
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FacebookFilled
                  style={{
                    color: "white",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
