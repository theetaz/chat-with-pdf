import {
  AppstoreOutlined,
  MailOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Payment E-Receipt.pdf", "1", <MessageOutlined />),
  getItem("chat 2", "2", <MessageOutlined />),
  getItem("chat 3", "3", <MessageOutlined />),
];

const SiderMenu = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <Menu
        theme={"dark"}
        onClick={onClick}
        style={{
          width: "full",
        }}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default SiderMenu;
