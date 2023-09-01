"use client";

import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import APIClient from "@/lib/axiosInterceptor";
import { useSelector } from "react-redux";

function CsvViewer() {
  const [urlFile, setUrlFile] = useState(null);
  const [pres, setPres] = useState([]);

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
