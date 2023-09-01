"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import APIClient from "@/lib/axiosInterceptor";

const PptViewer = ({ id }) => {
  const [urlFile, setUrlFile] = useState(null);

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
      
      setUrlFile(data.data.result.source_url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sourceId) {
      console.log("sourceId", sourceId);
      fetchDocUrl();
    }
  }, [sourceId]);

  // let sourceId = id;

  // //get file url from local storage
  // useEffect(() => {
  //   let fileUrl = "";

  //   if (typeof window !== "undefined") {
  //     // Check if the unique ID exists in local storage
  //     if (localStorage.getItem(`${sourceId}`)) {
  //       // If it exists, retrieve the unique ID
  //       fileUrl = localStorage.getItem(`${sourceId}`);
  //       setUrlFile(fileUrl);
  //     }
  //   }
  // }, [sourceId]);

  return (
    <>
      <div
        style={{
          marginTop: "50px",
        }}
      >
        {urlFile && (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${urlFile}`}
            width="100%"
            height="600"
          />
        )}
      </div>
    </>
  );
};

export default PptViewer;
