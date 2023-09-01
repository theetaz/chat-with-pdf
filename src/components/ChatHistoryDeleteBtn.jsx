import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import APIClient from "@/lib/axiosInterceptor";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setReloadChatHistory } from "@/feature/dataslice";


const ChatHistoryDeleteBtn = ({ sourceId }) => {
  const dispatch = useDispatch();
  const handleDeleteFunction = async () => {
    try {
      const response = await APIClient.delete(
        `/api/v1/chatdoc/?source_id=${sourceId}`
      );
      const data = response;
      console.log(data);
      if (data.data.code === "200") {
        message.success(data.data.message);
        dispatch(setReloadChatHistory(true));
      } else {
        message.error(data.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-end">
      <CloseCircleOutlined
        style={{
          position: "absolute",
          zIndex: 1,
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={handleDeleteFunction}
      />
    </div>
  );
};

export default ChatHistoryDeleteBtn;
