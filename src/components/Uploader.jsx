"use client";

import { setSummary } from "@/feature/dataslice";
import { message, Upload } from "antd";
import { useRouter } from "next/navigation";
const { Dragger } = Upload;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Uploader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFile] = useState(null);

  const props = {
    name: "file",
    multiple: false,
    action: "http://localhost:8000/api/v1/chatdoc/",
    accept: ".pdf",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(info.file.response.result);
        setUploadedFile(info.file.response.result);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    //route to chat page id
    if (uploadedFile) {
      dispatch(setSummary(uploadedFile.summary));
      router.push(`/chat/${uploadedFile.id}`);
    }
  }, [uploadedFile]);

  return (
    <Dragger {...props} className="uploader">
      <p className="ant-upload-drag-icon">+ New Chat</p>
      <p className="ant-upload-text">Click or drag PDF file</p>
    </Dragger>
  );
};

export default Uploader;
