"use client";

import { Button, Form, Input, List, Space, message } from "antd";
import { use, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import APIClient from "@/lib/axiosInterceptor";
import { useSession } from "next-auth/react";
import axios from "axios";

const ChatComp = ({ id }) => {
  const { data: session } = useSession();

  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localUserId, setLocalUserId] = useState(null);
  const [unregUserdata, setUnregUserdata] = useState(null);

  const messageEndRef = useRef(null);

  //testing
  let documentId = id;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASS_URL;

  //getting summary from redux store
  const summary = useSelector((state) => state.data.setSummary);

  useEffect(() => {
    if (summary) {
      setMessages([{ msg: summary, sender: "ai" }]);
    }
  }, [summary]);

  //unregister user logics
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
  }, []);

  //get access token from local storage

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem(`${localUserId}userToken`)) {
        // If it exists, retrieve the unique ID
        const unregUserdata = localStorage.getItem(`${localUserId}userToken`);

        console.log(`${localUserId}userToken`, unregUserdata);
        setUnregUserdata(unregUserdata);
      }
    }
  }, [localUserId]);

  useEffect(() => {
    if (unregUserdata) {
      console.log("unregUserdata :", unregUserdata);
    }
  }, [unregUserdata]);

  //send user typed message to backend

  const sendUserMessage = async () => {
    //check if user message is empty by removing white spaces
    if (userMessage.replace(/\s/g, "").length === 0) {
      return;
    }

    setMessages((messages) => [
      ...messages,
      { msg: userMessage, sender: "user" },
    ]);
    setUserMessage("");

    if (session) {
      try {
        setLoading(true);

        //authorization added
        const response = await APIClient.get(
          `/api/v1/chatdoc/chat?source_id=${documentId}&query=${userMessage}`
        );

        const data = response.data;

        console.log("data", data);

        if (data?.code === "409") {
          message.error(data?.message);
          setLoading(false);
          return;
        }

        setMessages((messages) => [
          ...messages,
          { msg: data.result?.reply, sender: "ai" },
        ]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        message.error(error.message);
        setLoading(false);
      }
    }
    if (!session) {
      try {
        const authToken = unregUserdata;
        const apiUrl = `${baseUrl}/api/v1/chatdoc/chat?source_id=${documentId}&query=${userMessage}`;

        const headers = new Headers({
          Authorization: `Bearer ${authToken} `,
          "Content-Type": "application/json",
        });

        const request = new Request(apiUrl, {
          method: "GET",
          headers: headers,
        });
        setLoading(true);
        console.log(loading);
        fetch(request)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            // Handle the response data
            console.log("unregister data from api :", data);
            if (data?.code === "409") {
              message.error(data?.message);
              setLoading(false);
              return;
            }
            setMessages((messages) => [
              ...messages,
              { msg: data.result?.reply, sender: "ai" },
            ]);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  //scroll to bottom
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //check if the message is empty and message history is there
  async function getChatHistory(documentId) {
    //register version
    if (messages.length === 0 && session) {
      console.log("tttttttt");
      try {
        //authorization added
        const response = await APIClient.get(
          `/api/v1/chatdoc/chat_history?source_id=${documentId}`
        );
        const data = response.data;

        setMessages(data.result?.chat_history);
      } catch (error) {
        console.log("coming from here", error);
      }
    }
  }

  //unregister version
  async function getChatHistoryUnregister(documentId) {
    if (messages.length === 0 && !session && unregUserdata) {
      console.log("unregister version");
      try {
        const authToken = unregUserdata;
        const apiUrl = `${baseUrl}/api/v1/chatdoc/chat_history?source_id=${documentId}`;

        const headers = new Headers({
          Authorization: `Bearer ${authToken} `,
          "Content-Type": "application/json",
        });

        const request = new Request(apiUrl, {
          method: "GET",
          headers: headers,
        });

        fetch(request)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            // Handle the response data
            console.log("unregister data from api :", data);
            setMessages(data.result?.chat_history);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (session) {
      if (messages?.length === 0 && documentId) {
        getChatHistory(documentId);
      }
    } else {
      if (messages?.length === 0 && documentId) {
        getChatHistoryUnregister(documentId);
      }
    }
  }, [messages, documentId, unregUserdata, session]);

  return (
    <div
      style={{
        backgroundColor: "#F6F4EB",
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        maxWidth: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          height: "42px",
          padding: "0px 6px",
          backgroundColor: "#F6F4EB",
          display: "flex",
          alignItems: "center",
          flexShrink: "0",
          borderBottom: "1px solid #e8e8e8",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            margin: "0px",
            paddingLeft: "6px",
          }}
        >
          Chat
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          overflow: "auto",
          width: "100%",
          flexGrow: "1",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "768px",
            overflow: "auto",
          }}
        >
          <List
            loading={loading}
            dataSource={messages}
            split={false}
            renderItem={(item, index) => (
              <List.Item key={index} className={`chatBubble ${item.sender}`}>
                <div className="chatMessage">
                  <ReactMarkdown
                    children={item?.msg}
                    remarkPlugins={[remarkGfm]}
                  />
                </div>
              </List.Item>
            )}
            style={{
              width: "100%",
              padding: "0px 12px",
              justifySelf: "center",
              overflow: "auto",
              fontSize: "14px",
            }}
          />
          <div ref={messageEndRef} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form
          onFinish={sendUserMessage}
          style={{
            width: "100%",
          }}
        >
          <Space.Compact
            style={{
              width: "100%",
              margin: "12px 0px 16px",
              padding: "0px 12px",
              maxWidth: "768px",
              display: "flex",
              flexShrink: "0",
              flexGrow: "1",
              alignSelf: "center",
            }}
          >
            <Input
              placeholder="Ask questions"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <Button
              type="default"
              htmlType="submit"
              style={{
                marginLeft: "3px",
              }}
              loading={loading}
              disabled={loading}
            >
              Send
            </Button>
          </Space.Compact>
        </Form>
      </div>
    </div>
  );
};

export default ChatComp;
