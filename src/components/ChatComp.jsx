import { Button, Input, List, Space } from "antd";
import React from "react";

const ChatComp = () => {
  const data = [
    {
      msg: "Hello",
      sender: "user",
    },
    {
      msg: "Hello there",
      sender: "ai",
    },
  ];
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        maxWidth: "100%",
        height: "100%",
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
          }}
        >
          <List
            loading={false}
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item key={index} className={`chatBubble ${item.sender}`}>
                {item?.msg}
              </List.Item>
            )}
            style={{
              width: "100%",
              padding: "0px 12px",
              justifySelf: "center",
              overflow: "auto",
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
          <Input defaultValue="Combine input and button" />
          <Button type="primary">Submit</Button>
        </Space.Compact>
      </div>
    </div>
  );
};

export default ChatComp;
