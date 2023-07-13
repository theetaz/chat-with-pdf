"use client";

import { setSummary } from "@/feature/dataslice";
import { message, Upload } from "antd";
import { useRouter } from "next/navigation";
const { Dragger } = Upload;

import React, { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Uploader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [pdfLink, setPdfLink] = useState(null);
  const [sourceId, setSourceId] = useState(null);

  //get user id from local storage
  useEffect(() => {
    let userId = "";

    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem("userId")) {
        // If it exists, retrieve the unique ID
        userId = localStorage.getItem("userId");
        console.log("userId :", userId);
        setUserId(userId);
      }
    }
  }, []);

  const props = {
    name: "file",
    multiple: false,
    action: "http://localhost:8000/api/v1/chatdoc/",
    headers: {
      ContentType: "application/pdf",
    },
    accept: ".pdf",
    data: {
      userid: userId?.toString(),
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(info.file.response.result);
        console.log("pdf url :", info.file.response.result.source_url);
        setPdfLink(info.file.response.result.source_url);
        setSourceId(info.file.response.result.source_id);
        setUploadedFile(info.file.response.result);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  //if pdf link is available, store it in local storage according to the source id

  useEffect(() => {
    if (pdfLink && sourceId) {
      if (typeof window !== "undefined") {
        localStorage.setItem(`${sourceId}`, pdfLink);
      }
    }
  }, [pdfLink, sourceId]);

  useEffect(() => {
    //route to chat page id
    if (uploadedFile) {
      dispatch(setSummary(uploadedFile.summary));
      router.push(`/chat/${uploadedFile.source_id}`);
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
