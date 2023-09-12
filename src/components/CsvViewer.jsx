"use client";

import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import APIClient from "@/lib/axiosInterceptor";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

function CsvViewer() {
  const { data: session } = useSession();
  const [urlFile, setUrlFile] = useState(null);
  const [pres, setPres] = useState([]);
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

  // useEffect(() => {
  //   if (sourceId) {
  //     console.log("sourceId", sourceId);
  //     fetchDocUrl();
  //   }
  // }, [sourceId]);

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

  // //testing
  // useEffect(() => {
  //   console.log("csv openner sourceId :", sourceId);
  // }, [sourceId]);

  // //get file url from local storage
  // useEffect(() => {
  //   let fileUrl = "";

  //   if (typeof window !== "undefined") {
  //     // Check if the unique ID exists in local storage
  //     if (localStorage.getItem(`${sourceId}`)) {
  //       // If it exists, retrieve the unique ID
  //       fileUrl = localStorage.getItem(`${sourceId}`);
  //       setUrlFile(fileUrl);
  //       console.log("fileUrl from LS :", fileUrl);
  //     }
  //   }
  // }, [sourceId]);

  /* Fetch and update the state once */
  useEffect(() => {
    if (urlFile) {
      (async () => {
        /* Download file */
        const file = await fetch(urlFile);
        const f = await file.arrayBuffer();
        const wb = read(f); // parse the array buffer
        const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
        const data = utils.sheet_to_json(ws); // generate objects
        setPres(data); // update state
      })();
    }
  }, [urlFile]);

  //testing
  // useEffect(() => {
  //   if (pres.length > 0) {
  //     console.log("table header :", Object.keys(pres[0]));
  //   }
  // }, [pres]);

  return (
    <div
      className="table-responsive"
      style={{
        height: "94vh",
        width: "100%",
        overflow: "auto",
        padding: "10px",
      }}
    >
      <table className="table table-bordered">
        <thead>
          <tr className="table-success">
            {pres.length > 0 &&
              Object.keys(pres[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {pres.length > 0 &&
            pres.map((individualData, index) => (
              <tr className="table-info" key={index}>
                {Object.keys(individualData).map((key) => (
                  <td key={key}>{individualData[key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CsvViewer;
