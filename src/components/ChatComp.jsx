"use client";
import { Button, Input, List, Space } from "antd";

const ChatComp = () => {
  const data = [
    {
      msg: "Bubble is a visual programming language, a no-code development platform and an application platform as a service, developed by Bubble Group, that enables non-technical people to build web applications without needing to type code.",
      sender: "ai",
    },
    {
      msg: "Hello",
      sender: "user",
    },
    {
      msg: "Bubble is a visual programming language, a no-code development platform and an application platform as a service, developed by Bubble Group, that enables non-technical people to build web applications without needing to type code.",
      sender: "ai",
    },
    {
      msg: "Bubble is a visual programming language, a no-code development platform and an application platform as a service, developed by Bubble Group, that enables non-technical people to build web applications without needing to type code.",
      sender: "user",
    },
    {
      msg: "Bubble is a visual programming language, a no-code development platform and an application platform as a service, developed by Bubble Group, that enables non-technical people to build web applications without needing to type code.",
      sender: "ai",
    },
    {
      msg: "Bubble is a visual programming language, a no-code development platform and an application platform as a service, developed by Bubble Group, that enables non-technical people to build web applications without needing to type code.",
      sender: "user",
    },
    {
      msg: "Bubble is a visual programming language, a no-code development platform and an application platform as a service, developed by Bubble Group, that enables non-technical people to build web applications without needing to type code.",
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
            dataSource={data}
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
          <Button
            type="primary"
            style={{
              marginLeft: "3px",
            }}
          >
            Send
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
};

export default ChatComp;
