"use client";

import ChatComp from "@/components/ChatComp";
import PdfViewer from "@/components/PdfViewer";
import SiderMenu from "@/components/SiderMenu";
import SiderUploader from "@/components/SiderUploader";

import { FacebookFilled, TwitterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        overflowX: "hidden",
        width: "100vw",
      }}
    >
      {/* sider  */}
      <div
        className="sider"
        style={{
          overflow: "auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(0 , 21 ,41 )",
        }}
      >
        <div
          className="sider-uploader"
          style={{
            margin: "10px",
            background: "rgba(255,255,255,0.2)",
            flexShrink: "0",
            width: "300px",
          }}
        >
          <SiderUploader />
        </div>
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
                height: "45px",
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
      </div>

      {/* pdf viewer */}

      <div
        style={{
          flex: "42.237",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              alignItems: "center",
              display: "flex",
              padding: "0px 8px 0px 6px",
              height: "42px",
            }}
          >
            <h1
              style={{
                fontSize: "16px",
                marginRight: "auto",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                paddingLeft: "6px",
                marginBottom: "0px",
              }}
            >
              Payment E-Receipt.pdf
            </h1>
          </div>
          <div>
            <PdfViewer />
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgb(238, 238 ,238 )",
          width: "4px",
          height: "100%",
        }}
      />
      {/* chats */}
      <div
        style={{
          flex: "33.5068 1 0px",
          overflow: "hidden",
        }}
      >
        <ChatComp />
      </div>
    </div>
  );
}
