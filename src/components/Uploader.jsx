"use client";

import { setSummary } from "@/feature/dataslice";
import { message, Spin, Upload } from "antd";
import { useRouter } from "next/navigation";
const { Dragger } = Upload;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Uploader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [pdfLink, setPdfLink] = useState(null);
  const [sourceId, setSourceId] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [loading, setLoading] = useState(false);

  //get user id from local storage
  useEffect(() => {
    let userId = "";

    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem("userId")) {
        // If it exists, retrieve the unique ID
        userId = localStorage.getItem("userId");

        setUserId(userId);
      }
    }
  });

  const props = {
    name: "file",
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_BASS_URL}/api/v1/chatdoc/`,
    headers: {
      ContentType: "application/pdf",
    },
    accept: ".pdf, .xlsx , .csv, .pptx , .ppt , .docx , .doc",
    data: {
      userid: userId,
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {
        setLoading(true);
      }
      if (status !== "uploading") {
        setLoading(false);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setPdfName(info.file.name);
        setPdfLink(info.file.response.result.source_url);
        setSourceId(info.file.response.result.source_id);
        setUploadedFile(info.file.response.result);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {},
  };

  //if pdf link is available, store it in local storage according to the source id

  useEffect(() => {
    if (pdfLink && sourceId) {
      if (typeof window !== "undefined") {
        localStorage.setItem(`${sourceId}`, pdfLink);
      }
    }
  }, [pdfLink, sourceId]);

  //if pdf name is available, store it in local storage according to the source id
  useEffect(() => {
    if (pdfName && sourceId) {
      if (typeof window !== "undefined") {
        localStorage.setItem(`${sourceId}name`, pdfName);
      }
    }
  }, [pdfName, sourceId]);

  useEffect(() => {
    //route to chat page id
    if (uploadedFile) {
      dispatch(setSummary(uploadedFile.summary));
      router.push(`/chat/${uploadedFile.source_id}`);
    }
  }, [uploadedFile]);

  return (
    <>
      <Dragger {...props} className="uploader">
        {loading && <Spin size="large" />}
        <p className="ant-upload-drag-icon">+ New Chat</p>
        <p className="ant-upload-text">
          Click or drag .pdf, .csv, .xlsx, .pptx or .docx
        </p>
      </Dragger>
    </>
  );
};

export default Uploader;
