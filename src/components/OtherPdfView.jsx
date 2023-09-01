"use client";

import { useEffect, useState } from "react";
import { Spin } from "antd";
import APIClient from "@/lib/axiosInterceptor";
import { useSelector } from "react-redux";

export default function OtherPdfView() {
  const [urlPdf, setUrlPdf] = useState(null);
  const [loading, setLoading] = useState(true);

  //get id from redux
  const sourceId = useSelector((state) => state.data.setUrlParam);

  //get document url from db

  const fetchDocUrl = async () => {
    try {
      const response = await APIClient.get(
        `/api/v1/chatdoc/chat_history?source_id=${sourceId}`
      );
      const data = response;
      console.log("data", data.data.result.source_url);
      setUrlPdf(data.data.result.source_url);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sourceId) {
      console.log("sourceId", sourceId);
      fetchDocUrl();
    }
  }, [sourceId]);

  // //get pdf url from local storage
  // useEffect(() => {
  //   let pdfUrl = "";

  //   if (typeof window !== "undefined") {
  //     // Check if the unique ID exists in local storage
  //     if (localStorage.getItem(`${sourceId}`)) {
  //       // If it exists, retrieve the unique ID
  //       pdfUrl = localStorage.getItem(`${sourceId}`);
  //       setUrlPdf(pdfUrl);

  //       setLoading(false);
  //     }
  //   }
  // }, [sourceId]);

  useEffect(() => {
    console.log("urlPdf", urlPdf);
  }, [urlPdf]);

  const url = urlPdf;

  const viewerUrl = `${url}#page=1&zoom=80&toolbar=0`;
  return (
    <>
      {loading ? (
        <div>
          <Spin size="large" />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "94vh",
            backgroundColor: "#ffffff !important",
          }}
        >
          <iframe src={viewerUrl} width="100%" height="100%" frameBorder="0" />
        </div>
      )}
    </>
  );
}
