"use client";
import { Button, Form, Input, List, Space } from "antd";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatComp = ({ id }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  //testing
  let documentId = id;
  useEffect(() => {
    console.log("documentId :", documentId);
  }, [documentId]);

  //send user typed message to backend

  const sendUserMessage = async () => {
    //check if user message is empty by removing white spaces
    if (userMessage.replace(/\s/g, "").length === 0) {
      return;
    }
    console.log("backend :", userMessage);
    setMessages((messages) => [
      ...messages,
      { msg: userMessage, sender: "user" },
    ]);
    setUserMessage("");
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/v1/chatdoc/chat?id=${documentId}&query=${userMessage}`
      );
      const data = await response.json();
      console.log(data.result.reply);
      setMessages((messages) => [
        ...messages,
        { msg: data.result.reply, sender: "ai" },
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(userMessage);
  }, [userMessage]);

  //getting summary from redux store
  const summary = useSelector((state) => state.data.setSummary);
  useEffect(() => {
    setMessages([{ msg: summary, sender: "ai" }]);
  }, [summary]);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
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
          backgroundColor: "#ffffff",
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
            loading={false}
            dataSource={messages}
            split={false}
            renderItem={(item, index) => (
              <List.Item key={index} className={`chatBubble ${item.sender}`}>
                <div className="chatMessage">{item?.msg}</div>
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
              type="primary"
              htmlType="submit"
              style={{
                marginLeft: "3px",
              }}
              loading={loading}
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
