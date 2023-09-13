"use client";

import { setSummary } from "@/feature/dataslice";
import { message, Spin, Upload } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import axios from "axios";
const { Dragger } = Upload;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Uploader = () => {
  const { data: session } = useSession();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASS_URL;

  const router = useRouter();
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [pdfLink, setPdfLink] = useState(null);
  const [sourceId, setSourceId] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [localUserId, setLocalUserId] = useState(null);
  const [unregUserdata, setUnregUserdata] = useState(null);

  const getUserId = () => {
    let userId = "";

    const decoded = jwt.decode(session.accessToken);
    console.log("decoded :", decoded.userid);
    userId = decoded.userid;
    setUserId(userId);
  };

  useEffect(() => {
    if (session) {
      getUserId();
    }
  }, [session]);

  //get user id from local storage
  useEffect(() => {
    if (!session) {
      let localUserId = "";

      if (typeof window !== "undefined") {
        // Check if the unique ID exists in local storage
        if (localStorage.getItem("localUserId")) {
          // If it exists, retrieve the unique ID
          localUserId = localStorage.getItem("localUserId");
          console.log("localUserId :", localUserId);
          setLocalUserId(localUserId);
          setUserId(localUserId);
        }
      }
    }
  });

  //get access token from local storage

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // Check if the unique ID exists in local storage
  //     if (localStorage.getItem(`${localUserId}userToken`)) {
  //       // If it exists, retrieve the unique ID
  //       const unregUserdata = localStorage.getItem(`${localUserId}userToken`);
  //       console.log(`Uploader page  ${localUserId}userToken`, unregUserdata);
  //       setUnregUserdata(unregUserdata);
  //     }
  //   }
  // }, [localUserId]);

  useEffect(() => {
    if (localUserId) {
      const checkLocalStorage = () => {
        if (typeof window !== "undefined" && localUserId) {
          const token = localStorage.getItem(`${localUserId}userToken`);
          if (token) {
            // Token found, stop the interval
            console.log("token found");
            clearInterval(intervalId);
            setUnregUserdata(token);
          }
        }
      };

      // Start the interval (check every 1000ms or 1 second)
      const intervalId = setInterval(checkLocalStorage, 1000);

      // Clean up the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }
    // Function to check for the token in local storage
  }, [localUserId]);

  useEffect(() => {
    if (session) {
      console.log("uploader session", session);
      setAccessToken(session.accessToken);
    }
    // if (!session && unregUserdata) {
    //   console.log("local access token", unregUserdata);
    //   setAccessToken(unregUserdata);
    // }
  }, [session]);

  const props = {
    name: "file",
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_BASS_URL}/api/v1/chatdoc/`,
    headers: {
      ContentType: "application/pdf",
      Authorization: `Bearer ${accessToken || unregUserdata}`,
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
        if (info.file.response.code === "409") {
          message.error(`${info.file.response.message}`);
        }
        if (info.file.response.code === "200") {
          message.success(`${info.file.name} file uploaded successfully.`);
        }
        setPdfName(info.file.name);
        setPdfLink(info.file.response.result?.source_url);
        setSourceId(info.file.response.result?.source_id);
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
