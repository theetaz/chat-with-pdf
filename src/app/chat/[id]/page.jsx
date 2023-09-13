"use client";

import ChatComp from "@/components/ChatComp";
import CsvViewer from "@/components/CsvViewer";
import DocsViewer from "@/components/DocsViewer";
import OtherPdfView from "@/components/OtherPdfView";
import PptViewer from "@/components/PptViewer";
import { setUrlParam } from "@/feature/dataslice";
import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import APIClient from "@/lib/axiosInterceptor";
import { useSession } from "next-auth/react";

export default function Page({ params }) {
  const { data: session } = useSession();
  let id = params.id;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASS_URL;

  const dispach = useDispatch();

  useEffect(() => {
    dispach(setUrlParam(id));
  }, [id]);

  const [pdfFileName, setPdfFileName] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [localUserId, setLocalUserId] = useState(null);
  const [unregUserdata, setUnregUserdata] = useState(null);

  //get access token and userId from local storage

  useEffect(() => {
    let localUserId = "";

    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem("localUserId")) {
        // If it exists, retrieve the unique ID
        localUserId = localStorage.getItem("localUserId");
        console.log("localUserId :", localUserId);
        setLocalUserId(localUserId);
      }
    }
  });

  //get access token from local storage

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem(`${localUserId}userToken`)) {
        // If it exists, retrieve the unique ID
        const unregUserdata = localStorage.getItem(`${localUserId}userToken`);
        console.log(`chat page  ${localUserId}userToken`, unregUserdata);
        setUnregUserdata(unregUserdata);
      }
    }
  });

  //get document url from db

  const fetchDocUrl = async () => {
    try {
      const response = await APIClient.get(
        `/api/v1/chatdoc/chat_history?source_id=${id}`
      );
      const data = response.data;
      console.log("data", data.result.source_url);
      setPdfFileName(data?.result?.source_url);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDocUrlUnreg = async () => {
    try {
      const authToken = unregUserdata;
      console.log("fetchDocUrlUnreg", authToken);

      const apiUrl = `${baseUrl}/api/v1/chatdoc/chat_history?source_id=${id}`;

      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      });

      const request = new Request(apiUrl, {
        method: "GET",
        headers: headers,
      });

      fetch(request)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response data
          console.log("set pdf file name:", data);
          setPdfFileName(data?.result?.source_url);
        });
    } catch (error) {
      console.log("this err", error);
    }
  };

  useEffect(() => {
    if (id && session) {
      fetchDocUrl();
    }

    if (!session && unregUserdata && id) {
      fetchDocUrlUnreg();
    }
  }, [id, session, unregUserdata]);

  //get pdf name from local storage
  // useEffect(() => {
  //   let pdfName = "";

  //   if (typeof window !== "undefined") {
  //     // Check if the unique ID exists in local storage
  //     if (localStorage.getItem(`${id}name`)) {
  //       // If it exists, retrieve the unique ID
  //       pdfName = localStorage.getItem(`${id}name`);
  //       setPdfFileName(pdfName);
  //     }
  //   }
  // }, [id]);

  //based on name identify the file type

  useEffect(() => {
    if (pdfFileName) {
      let fileType = pdfFileName.split(".").pop();
      setFileType(fileType);
      console.log(fileType);
    }
  }, [pdfFileName]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        overflowX: "hidden",
      }}
    >
      {/* viewer */}

      <div
        style={{
          flex: "42.237",
          overflow: "hidden",
        }}
        className="pdf-view-col"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#F6F4EB",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              alignItems: "center",
              display: "flex",
              padding: "0px 8px 0px 6px",
              height: "42px",
              borderBottom: "2px solid rgb(238, 238 ,238 )",
            }}
          >
            <h1
              style={{
                fontSize: "16px",
                marginRight: "auto",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                paddingLeft: "6px",
                marginBottom: "0px",
              }}
            >
              {pdfFileName}
            </h1>
          </div>
          {fileType && fileType === "pdf" ? (
            <div>
              <OtherPdfView />
            </div>
          ) : fileType === "xlsx" ||
            fileType === "xls" ||
            fileType === "csv" ? (
            <div>
              <CsvViewer />
            </div>
          ) : fileType === "pptx" || fileType === "ppt" ? (
            <div
              style={{
                height: "100%",
              }}
            >
              <PptViewer id={id} />
            </div>
          ) : fileType === "docx" || fileType === "doc" ? (
            <div>
              <DocsViewer id={id} />
            </div>
          ) : null}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          width: "4px",
          height: "100vh",
        }}
      />
      {/* chats */}
      <div
        style={{
          flex: "33.5068 1 0px",
          overflow: "hidden",
          backgroundColor: "#Ffffff",
        }}
      >
        <ChatComp id={id} />
      </div>
    </div>
  );
}
