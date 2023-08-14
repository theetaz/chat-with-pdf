"use client";
import { Spin } from "antd";

export default function loading() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Spin size="large" />
    </div>
  );
}
