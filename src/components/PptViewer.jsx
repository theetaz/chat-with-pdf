"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import APIClient from "@/lib/axiosInterceptor";
import { useSession } from "next-auth/react";

const PptViewer = ({ id }) => {
  const { data: session } = useSession();
  const [urlFile, setUrlFile] = useState(null);
  const [localUserId, setLocalUserId] = useState(null);
  const [unregUserdata, setUnregUserdata] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASS_URL;

  //get id from redux
  const sourceId = useSelector((state) => state.data.setUrlParam);

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
          setUrlFile(data?.result?.source_url);
        });
    } catch (error) {
      console.log("this err", error);
    }
  };

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
    if (sourceId && session) {
      console.log("sourceId", sourceId);
      fetchDocUrl();
    }

    if (sourceId && !session && unregUserdata) {
      console.log("sourceId", sourceId);
      fetchDocUrlUnreg();
    }
  }, [sourceId, session, unregUserdata]);

  // useEffect(() => {
  //   if (sourceId) {
  //     console.log("sourceId", sourceId);
  //     fetchDocUrl();
  //   }
  // }, [sourceId]);

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
