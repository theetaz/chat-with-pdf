"use client";

import { useEffect, useState } from "react";
import { Spin } from "antd";
import APIClient from "@/lib/axiosInterceptor";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

export default function OtherPdfView() {
  const [urlPdf, setUrlPdf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localUserId, setLocalUserId] = useState(null);
  const [unregUserdata, setUnregUserdata] = useState(null);

  const { data: session } = useSession();

  //get id from redux
  const sourceId = useSelector((state) => state.data.setUrlParam);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASS_URL;

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

  const fetchDocUrlUnreg = async () => {
    try {
      const authToken = unregUserdata;
      console.log("fetchDocUrlUnreg", authToken);

      const apiUrl = `${baseUrl}/api/v1/chatdoc/chat_history?source_id=${sourceId}`;

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
          setUrlPdf(data?.result?.source_url);
          setLoading(false);
        });
    } catch (error) {
      console.log("this err", error);
    }
  };

  useEffect(() => {
    if (sourceId && session) {
      console.log("sourceId", sourceId);
      fetchDocUrl();
    }

    if (sourceId && !session && unregUserdata) {
      console.log("sourceId", sourceId);
      fetchDocUrlUnreg();
    }
  }, [sourceId, session, unregUserdata]);

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
