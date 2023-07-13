"use client";

import Head from "next/head";
import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import SiderMenu from "@/components/SiderMenu";
import Link from "next/link";

import { FacebookFilled, TwitterOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function ChatLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={300}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            className="site-layout-background"
          >
            <SiderMenu />
            <div
              style={{
                marginTop: "auto",
              }}
            >
              <div>
                <Button
                  style={{
                    background: "transparent",
                    color: "white",
                    width: "100%",
                  }}
                >
                  Sign in to save your chat history
                </Button>
              </div>
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
      </body>
    </html>
  );
}
